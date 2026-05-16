const CLIENT_ID = 'c12f2deae23b40238f1c3602611e37cf'
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI || 'https://localhost:5173/callback'
const SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-modify-playback-state',
].join(' ')

function generateVerifier() {
  const arr = new Uint8Array(32)
  crypto.getRandomValues(arr)
  return btoa(String.fromCharCode(...arr)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

async function generateChallenge(verifier) {
  const data = new TextEncoder().encode(verifier)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

export async function login() {
  const verifier = generateVerifier()
  const challenge = await generateChallenge(verifier)
  localStorage.setItem('pkce_verifier', verifier)
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    code_challenge_method: 'S256',
    code_challenge: challenge,
  })
  window.location.href = `https://accounts.spotify.com/authorize?${params}`
}

export async function exchangeCode(code) {
  const verifier = localStorage.getItem('pkce_verifier')
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: verifier,
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error_description || data.error)
  storeTokens(data)
  return data.access_token
}

function storeTokens(data) {
  localStorage.setItem('access_token', data.access_token)
  localStorage.setItem('token_expiry', Date.now() + data.expires_in * 1000)
  if (data.refresh_token) localStorage.setItem('refresh_token', data.refresh_token)
}

export async function getToken() {
  const expiry = parseInt(localStorage.getItem('token_expiry') || '0')
  if (Date.now() < expiry - 60000) return localStorage.getItem('access_token')
  return doRefresh()
}

async function doRefresh() {
  const refresh = localStorage.getItem('refresh_token')
  if (!refresh) return null
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'refresh_token',
      refresh_token: refresh,
    }),
  })
  const data = await res.json()
  if (data.error) { logout(); return null }
  storeTokens(data)
  return data.access_token
}

export function isLoggedIn() {
  return !!localStorage.getItem('access_token')
}

export function logout() {
  ['access_token', 'token_expiry', 'refresh_token', 'pkce_verifier'].forEach(k =>
    localStorage.removeItem(k)
  )
}
