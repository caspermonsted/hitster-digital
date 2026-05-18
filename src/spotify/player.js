import { getToken } from './auth'

let player = null
let deviceId = null
let deviceReadyResolve = null
const deviceReady = new Promise(r => { deviceReadyResolve = r })

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

export function initPlayer() {
  if (isMobile) {
    // On mobile the Web Playback SDK doesn't work.
    // We use Spotify Connect instead — playback happens in the Spotify app.
    return getToken().then(() => {}) // just verify auth
  }

  return new Promise((resolve, reject) => {
    if (player) { resolve(); return }

    window.onSpotifyWebPlaybackSDKReady = () => {
      player = new window.Spotify.Player({
        name: 'Side A',
        getOAuthToken: async cb => cb(await getToken()),
        volume: 0.8,
      })

      player.addListener('ready', ({ device_id }) => {
        deviceId = device_id
        deviceReadyResolve(device_id)
        resolve()
      })

      player.addListener('not_ready', () => { deviceId = null })
      player.addListener('initialization_error', ({ message }) => reject(new Error(message)))
      player.addListener('authentication_error', ({ message }) => reject(new Error(message)))
      player.addListener('account_error', () => reject(new Error('Spotify Premium required')))

      player.connect()
    }

    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    document.head.appendChild(script)
  })
}

export async function playSong(uri) {
  const token = await getToken()

  if (isMobile) {
    // Try playing on the currently active device (Spotify app on phone)
    const res = await fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ uris: [uri] }),
    })

    if (res.status === 404 || res.status === 204) {
      // No active device — find one
      const devRes = await fetch('https://api.spotify.com/v1/me/player/devices', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const devData = await devRes.json()
      const device = devData.devices?.[0]
      if (!device) throw new Error('Open the Spotify app on your phone first, then press Play.')
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device.id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ uris: [uri] }),
      })
    }
    return
  }

  // Desktop — use Web Playback SDK device
  const id = await deviceReady
  await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ uris: [uri] }),
  })
}

export async function pauseSong() {
  try {
    const token = await getToken()
    await fetch('https://api.spotify.com/v1/me/player/pause', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (_) {
    // Non-critical — ignore pause errors
  }
}

export function getPlayer() { return player }
