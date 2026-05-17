import { login } from '../spotify/auth'

export default function Login({ onDemo }) {
  return (
    <div style={{
      minHeight: '100%',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 480,
      margin: '0 auto',
    }}>
      {/* Top strip */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0.6rem 1.25rem',
        borderBottom: '1px solid var(--border)',
        fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem',
        letterSpacing: '0.18em', color: 'var(--label)',
      }}>
        <span>NO. 047 · EST. MMXXVI</span>
        <span style={{ fontSize: '0.9rem' }}>◐</span>
        <span>WELCOME</span>
      </div>

      {/* Hero */}
      <div style={{
        position: 'relative', flex: 1,
        padding: '1.5rem 1.25rem 1.25rem',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--label)', marginBottom: '0.5rem' }}>
          A LISTENING GAME
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(3.5rem, 18vw, 5rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
              margin: 0,
              color: 'var(--ink)',
            }}>Side</h1>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: 'clamp(4rem, 20vw, 5.8rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
              color: 'var(--accent)',
              margin: 0,
            }}>A.</h1>
          </div>


          {/* Vinyl */}
          <div style={{ flexShrink: 0, marginTop: '0.5rem', opacity: 0.55 }}>
            <div style={{
              width: 110, height: 110, borderRadius: '50%',
              background: 'radial-gradient(circle at 50% 50%, #2a221c 0 35%, #181410 35% 100%)',
              position: 'relative',
              boxShadow: '0 6px 24px rgba(0,0,0,0.14)',
            }}>
              <div style={{ position: 'absolute', inset: 20, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)' }} />
              <div style={{ position: 'absolute', inset: 34, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)' }} />
              <div style={{ position: 'absolute', inset: '50% 50%', width: 42, height: 42, marginLeft: -21, marginTop: -21, borderRadius: '50%', background: 'var(--accent)' }} />
              <div style={{ position: 'absolute', inset: '50% 50%', width: 6, height: 6, marginLeft: -3, marginTop: -3, borderRadius: '50%', background: 'var(--bg)' }} />
            </div>
          </div>
        </div>

        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: '1rem', lineHeight: 1.5,
          color: 'var(--ink2)', margin: '1rem 0 0.75rem',
          maxWidth: 280,
        }}>
          A music timeline quiz for parties, families <span style={{ color: 'var(--accent)' }}>and</span> obscure DJs.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <div style={{ width: 24, borderTop: '1px solid var(--accent)', opacity: 0.5 }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.14em', color: 'var(--muted)' }}>
            PLACE THE SONG · NAME THE ARTIST · WIN THE CARD
          </span>
        </div>

        {/* How it goes */}
        <div style={{ marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
            <div style={{ border: '1px solid var(--label)', padding: '1px 5px' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '0.7rem', color: 'var(--label)', fontWeight: 700 }}>§</span>
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 700, fontSize: '1rem' }}>How it goes</span>
          </div>
          {[
            'A song plays. You don\'t see what it is.',
            'Drag the card to the right spot on the timeline.',
            'Guess the title or artist — and win the card.',
          ].map((text, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.4rem', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 700, fontSize: '1rem', color: 'var(--accent)', lineHeight: 1.3, minWidth: '0.9rem' }}>{i + 1}</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Login button */}
      <div>
        <button
          onClick={login}
          style={{
            width: '100%',
            background: 'var(--ink)',
            color: 'var(--bg)',
            padding: '1.1rem 1.25rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer',
            border: 'none',
          }}
        >
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.18em', color: '#d4a13a', marginBottom: '0.2rem' }}>
              SIGN IN WITH SPOTIFY
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 800, fontSize: '1.3rem' }}>
              Drop the needle
            </div>
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: '#1db954',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <SpotifyLogo />
          </div>
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 1.25rem' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.14em', color: 'var(--muted)' }}>REQUIRES SPOTIFY PREMIUM</span>
          <button onClick={onDemo} className="btn-ghost" style={{ fontSize: '0.55rem', padding: '0.2rem 0.5rem', letterSpacing: '0.12em' }}>
            DEMO MODE
          </button>
        </div>
      </div>
    </div>
  )
}

function SpotifyLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  )
}
