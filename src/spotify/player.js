import { getToken } from './auth'

let player = null
let deviceId = null
let deviceReadyResolve = null
const deviceReady = new Promise(r => { deviceReadyResolve = r })

export function initPlayer() {
  return new Promise((resolve, reject) => {
    if (player) { resolve(); return }

    window.onSpotifyWebPlaybackSDKReady = () => {
      player = new window.Spotify.Player({
        name: 'Hitster Digital',
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
      player.addListener('account_error', () => reject(new Error('Spotify Premium påkrævet')))

      player.connect()
    }

    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    document.head.appendChild(script)
  })
}

export async function playSong(uri) {
  const id = await deviceReady
  const token = await getToken()
  await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ uris: [uri] }),
  })
}

export async function pauseSong() {
  const token = await getToken()
  await fetch('https://api.spotify.com/v1/me/player/pause', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
  })
}

export function getPlayer() { return player }
