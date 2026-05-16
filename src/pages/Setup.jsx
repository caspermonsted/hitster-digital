import { useState } from 'react'

const DECADES = ['60s', '70s', '80s', '90s', '00s', '10s', '20s']
const GENRES = [
  { value: 'all', label: 'Alle genrer' },
  { value: 'pop', label: 'Pop' },
  { value: 'rock', label: 'Rock' },
  { value: 'hip-hop', label: 'Hip-Hop' },
  { value: 'dance', label: 'Dance / Electronic' },
  { value: 'r&b', label: 'R&B / Soul' },
]
const DIFFICULTIES = [
  { value: 'easy', label: 'Let', desc: 'Store hits' },
  { value: 'medium', label: 'Medium', desc: 'Kendte sange' },
  { value: 'hard', label: 'Svær', desc: 'Mere obskurt' },
]

export default function Setup({ onStart }) {
  const [team1, setTeam1] = useState('Hold 1')
  const [team2, setTeam2] = useState('Hold 2')
  const [decades, setDecades] = useState(['80s', '90s', '00s', '10s'])
  const [difficulty, setDifficulty] = useState('medium')
  const [genre, setGenre] = useState('all')
  const [rounds, setRounds] = useState(20)

  function toggleDecade(d) {
    setDecades(prev =>
      prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
    )
  }

  function handleStart() {
    if (!team1.trim() || !team2.trim()) return
    if (decades.length === 0) return
    onStart({ team1: team1.trim(), team2: team2.trim(), decades, difficulty, genre, rounds })
  }

  return (
    <div className="page" style={{ gap: '1.5rem', paddingBottom: '2rem' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 900, textAlign: 'center' }}>🎵 Hitster Digital</h1>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <label style={labelStyle}>Holdnavne</label>
        <input
          type="text"
          value={team1}
          onChange={e => setTeam1(e.target.value)}
          placeholder="Hold 1"
          maxLength={20}
        />
        <input
          type="text"
          value={team2}
          onChange={e => setTeam2(e.target.value)}
          placeholder="Hold 2"
          maxLength={20}
        />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <label style={labelStyle}>Årtier</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {DECADES.map(d => (
            <button
              key={d}
              onClick={() => toggleDecade(d)}
              style={chipStyle(decades.includes(d))}
            >
              {d}
            </button>
          ))}
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <label style={labelStyle}>Sværhedsgrad</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {DIFFICULTIES.map(d => (
            <button
              key={d.value}
              onClick={() => setDifficulty(d.value)}
              style={{ ...chipStyle(difficulty === d.value), flex: 1, flexDirection: 'column', padding: '0.6rem 0.3rem' }}
            >
              <span style={{ fontWeight: 700 }}>{d.label}</span>
              <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>{d.desc}</span>
            </button>
          ))}
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <label style={labelStyle}>Genre</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {GENRES.map(g => (
            <button
              key={g.value}
              onClick={() => setGenre(g.value)}
              style={chipStyle(genre === g.value)}
            >
              {g.label}
            </button>
          ))}
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <label style={labelStyle}>Antal runder</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[10, 20, 30].map(n => (
            <button
              key={n}
              onClick={() => setRounds(n)}
              style={{ ...chipStyle(rounds === n), flex: 1 }}
            >
              {n}
            </button>
          ))}
        </div>
      </section>

      <button
        className="btn-primary"
        onClick={handleStart}
        disabled={!team1.trim() || !team2.trim() || decades.length === 0}
        style={{ marginTop: '0.5rem' }}
      >
        Start spil
      </button>
    </div>
  )
}

const labelStyle = {
  fontSize: '0.85rem',
  fontWeight: 700,
  color: 'var(--muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}

const chipStyle = active => ({
  background: active ? 'var(--accent)' : 'var(--card)',
  color: active ? '#fff' : 'var(--text)',
  border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
  borderRadius: 8,
  padding: '0.5rem 0.8rem',
  fontSize: '0.9rem',
  fontWeight: active ? 700 : 400,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})
