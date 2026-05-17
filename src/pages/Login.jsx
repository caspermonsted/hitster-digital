import { login } from '../spotify/auth'

export default function Login() {
  return (
    <div style={{
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '4rem 2rem 3rem',
      maxWidth: 480,
      margin: '0 auto',
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <div style={{
          width: 88, height: 88, borderRadius: 22,
          background: 'linear-gradient(135deg, #ff2d55, #ff9f0a)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2.5rem', marginBottom: '0.5rem',
          boxShadow: '0 8px 32px rgba(255,45,85,0.35)',
        }}>
          🎵
        </div>
        <h1 style={{ fontSize: '2.6rem', fontWeight: 800, letterSpacing: '-0.03em', textAlign: 'center' }}>
          Hitster
        </h1>
        <p style={{ color: 'var(--text2)', fontSize: '1rem', textAlign: 'center', lineHeight: 1.5, maxWidth: 260 }}>
          Gæt årstallet og byg din tidslinje
        </p>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <button
          onClick={login}
          style={{
            background: '#1db954',
            color: '#000',
            fontWeight: 700,
            fontSize: '1.05rem',
            width: '100%',
            padding: '1rem',
            borderRadius: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            letterSpacing: '-0.01em',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          Log ind med Spotify
        </button>
        <p style={{ color: 'var(--text3)', fontSize: '0.78rem', textAlign: 'center' }}>
          Kræver Spotify Premium
        </p>
      </div>
    </div>
  )
}
