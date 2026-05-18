import { getToken } from './auth'

let player = null
let deviceId = null
let deviceReadyResolve = null
const deviceReady = new Promise(r => { deviceReadyResolve = r })

export const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

// Audio element used for preview playback on mobile
let audioEl = null

function getAudio() {
  if (!audioEl) {
    audioEl = new Audio()
    audioEl.volume = 0.9
  }
  return audioEl
}

export function initPlayer() {
  if (isMobile) {
    // No SDK on mobile — just verify auth token is valid
    return getToken().then(() => {})
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

export async function playSong(uri, previewUrl) {
  if (isMobile) {
    if (previewUrl) {
      // Play 30-second preview directly in the browser — no Spotify app shown
      const audio = getAudio()
      audio.src = previewUrl
      await audio.play()
      return
    }
    // No preview available — fall back to Spotify Connect
    const token = await getToken()
    const res = await fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ uris: [uri] }),
    })
    if (res.status === 404) {
      const devRes = await fetch('https://api.spotify.com/v1/me/player/devices', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const devData = await devRes.json()
      const device = devData.devices?.[0]
      if (!device) throw new Error('No preview available. Open the Spotify app on your phone first, then press Play.')
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device.id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ uris: [uri] }),
      })
    }
    return
  }

  // Desktop — Web Playback SDK
  const id = await deviceReady
  const token = await getToken()
  await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ uris: [uri] }),
  })
}

export async function pauseSong() {
  try {
    if (isMobile && audioEl) {
      audioEl.pause()
      return
    }
    const token = await getToken()
    await fetch('https://api.spotify.com/v1/me/player/pause', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (_) {
    // Non-critical
  }
}

export function getPlayer() { return player }
