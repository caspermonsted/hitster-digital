import { login } from '../spotify/auth'

export default function Login() {
  return (
    <div className="page" style={{ justifyContent: 'center', alignItems: 'center', gap: '2rem', textAlign: 'center' }}>
      <div>
        <div style={{ fontSize: '4rem' }}>🎵</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '0.5rem' }}>Hitster</h1>
        <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>Digital udgave</p>
      </div>

      <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
          Log ind med Spotify Premium for at spille sange og konkurrere om den bedste tidslinje.
        </p>
        <button className="btn-green" onClick={login}>
          Log ind med Spotify
        </button>
      </div>
    </div>
  )
}
