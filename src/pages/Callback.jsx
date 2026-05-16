import { useEffect, useState } from 'react'
import { exchangeCode } from '../spotify/auth'

export default function Callback({ onDone }) {
  const [error, setError] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const err = params.get('error')

    if (err) { setError('Spotify login afvist.'); return }
    if (!code) { setError('Ingen kode modtaget.'); return }

    exchangeCode(code)
      .then(() => {
        window.history.replaceState({}, '', '/')
        onDone()
      })
      .catch(e => setError(e.message))
  }, [])

  if (error) {
    return (
      <div className="page" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ color: 'var(--accent)' }}>{error}</p>
        <button className="btn-secondary" onClick={() => window.location.href = '/'} style={{ marginTop: '1rem', width: 'auto' }}>
          Prøv igen
        </button>
      </div>
    )
  }

  return (
    <div className="page" style={{ justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
      <div style={{ fontSize: '2rem' }}>🎵</div>
      <p style={{ color: 'var(--muted)' }}>Logger ind...</p>
    </div>
  )
}
