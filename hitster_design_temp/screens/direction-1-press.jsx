/* Direction 1: "PRESS" — Monochrome editorial. Off-white paper, deep black, oxblood accent. */
const Direction1 = () => {
  const [teams, setTeams] = React.useState(["Hold 1", "Hold 2"]);
  const [decades, setDecades] = React.useState(["80s", "90s", "00s", "10s"]);
  const [difficulty, setDifficulty] = React.useState("Medium");
  const [genre, setGenre] = React.useState("Alle");

  const allDecades = ["60s", "70s", "80s", "90s", "00s", "10s", "20s"];
  const genres = ["Alle", "Pop", "Rock", "Hip-Hop", "Dance", "R&B/Soul"];

  const toggleDecade = (d) => {
    setDecades(decades.includes(d) ? decades.filter(x => x !== d) : [...decades, d]);
  };

  return (
    <div style={d1.root}>
      {/* Masthead */}
      <div style={d1.masthead}>
        <div style={d1.mastheadTop}>
          <span style={d1.mastheadIssue}>NO. 047</span>
          <span style={d1.mastheadDot}>·</span>
          <span style={d1.mastheadDate}>MAJ MMXXVI</span>
          <span style={{...d1.mastheadDot, marginLeft: 'auto'}}>·</span>
          <span style={d1.mastheadIssue}>DKK 0,—</span>
        </div>
        <div style={d1.mastheadRule}></div>
        <div style={d1.mastheadName}>THE&nbsp;LISTENING&nbsp;POST</div>
        <div style={d1.mastheadRuleThick}></div>
        <div style={d1.mastheadKicker}>
          <span>EN MUSIKQUIZ I FLERE AKTER</span>
          <span>SIDE 01 / 04</span>
        </div>
      </div>

      {/* Headline */}
      <div style={d1.headlineBlock}>
        <div style={d1.headlineLabel}>FORSPIL</div>
        <h1 style={d1.headline}>Nyt spil.</h1>
        <p style={d1.dek}>
          Indstil aftenens parametre. Vælg deltagere, årtier, sværhedsgrad
          og repertoire — og lad nålen falde.
        </p>
      </div>

      {/* HOLD section */}
      <Section1 num="I" label="HOLD" caption="Mindst to deltagere">
        <div style={d1.teamList}>
          {teams.map((t, i) => (
            <div key={i} style={d1.teamRow}>
              <span style={d1.teamNum}>{String(i + 1).padStart(2, '0')}</span>
              <input
                style={d1.teamInput}
                value={t}
                onChange={(e) => {
                  const next = [...teams];
                  next[i] = e.target.value;
                  setTeams(next);
                }}
              />
              {teams.length > 2 && (
                <button style={d1.teamRemove} onClick={() => setTeams(teams.filter((_, x) => x !== i))}>×</button>
              )}
            </div>
          ))}
          <button
            style={d1.addTeam}
            onClick={() => setTeams([...teams, `Hold ${teams.length + 1}`])}
          >
            <span style={d1.addPlus}>+</span> Tilføj hold
          </button>
        </div>
      </Section1>

      {/* ÅRTIER */}
      <Section1 num="II" label="ÅRTIER" caption={`${decades.length} valgt`}>
        <div style={d1.decadeGrid}>
          {allDecades.map((d) => {
            const active = decades.includes(d);
            return (
              <button
                key={d}
                onClick={() => toggleDecade(d)}
                style={{...d1.decade, ...(active ? d1.decadeActive : {})}}
              >
                {d}
                {active && <span style={d1.decadeCheck}>✓</span>}
              </button>
            );
          })}
        </div>
      </Section1>

      {/* SVÆRHEDSGRAD */}
      <Section1 num="III" label="SVÆRHEDSGRAD" caption="Kun ét niveau">
        <div style={d1.diffList}>
          {[
            { k: "Let", t: "STORE HITS", n: "01" },
            { k: "Medium", t: "KENDTE SANGE", n: "02" },
            { k: "Svær", t: "OBSKURT", n: "03" },
          ].map((opt) => {
            const active = difficulty === opt.k;
            return (
              <button
                key={opt.k}
                onClick={() => setDifficulty(opt.k)}
                style={{...d1.diffRow, ...(active ? d1.diffRowActive : {})}}
              >
                <span style={d1.diffNum}>{opt.n}</span>
                <span style={d1.diffName}>{opt.k}</span>
                <span style={d1.diffSub}>{opt.t}</span>
                <span style={d1.diffDot}>{active ? '●' : '○'}</span>
              </button>
            );
          })}
        </div>
      </Section1>

      {/* GENRE */}
      <Section1 num="IV" label="GENRE" caption="Repertoire">
        <div style={d1.genreList}>
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              style={{...d1.genre, ...(genre === g ? d1.genreActive : {})}}
            >
              {g}
            </button>
          ))}
        </div>
      </Section1>

      {/* Start */}
      <div style={d1.footer}>
        <div style={d1.footerRule}></div>
        <button style={d1.startBtn}>
          <span style={d1.startText}>Lad spillet begynde</span>
          <span style={d1.startArrow}>→</span>
        </button>
        <div style={d1.colophon}>
          <span>EDITED BY THE HOUSE</span>
          <span>PRINTED IN COPENHAGEN</span>
        </div>
      </div>
    </div>
  );
};

const Section1 = ({ num, label, caption, children }) => (
  <div style={d1.section}>
    <div style={d1.sectionHead}>
      <span style={d1.sectionNum}>§ {num}</span>
      <span style={d1.sectionLabel}>{label}</span>
      <span style={d1.sectionRule}></span>
      <span style={d1.sectionCaption}>{caption}</span>
    </div>
    {children}
  </div>
);

const d1 = {
  root: {
    width: '100%', minHeight: '100%',
    background: '#f4efe6',
    color: '#111',
    fontFamily: '"Inter", system-ui, sans-serif',
    padding: '20px 22px 32px',
    boxSizing: 'border-box',
  },
  masthead: { marginBottom: 26 },
  mastheadTop: {
    display: 'flex', gap: 6, alignItems: 'center',
    fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.12em',
    color: '#3a342c',
  },
  mastheadDot: { opacity: 0.5 },
  mastheadIssue: {},
  mastheadDate: {},
  mastheadRule: { borderTop: '1px solid #111', marginTop: 8, marginBottom: 6 },
  mastheadName: {
    fontFamily: '"Playfair Display", "Times New Roman", serif',
    fontWeight: 900, fontStyle: 'italic',
    fontSize: 30, lineHeight: 1, letterSpacing: '-0.01em',
    textAlign: 'center',
  },
  mastheadRuleThick: { borderTop: '3px solid #111', marginTop: 6 },
  mastheadKicker: {
    marginTop: 7,
    display: 'flex', justifyContent: 'space-between',
    fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.14em',
    color: '#3a342c',
  },
  headlineBlock: { marginBottom: 28 },
  headlineLabel: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 10, letterSpacing: '0.2em', color: '#8b1414', marginBottom: 8,
  },
  headline: {
    fontFamily: '"Playfair Display", serif',
    fontWeight: 900,
    fontSize: 56, lineHeight: 0.92, margin: 0,
    letterSpacing: '-0.03em',
  },
  dek: {
    fontFamily: '"Source Serif Pro", "Playfair Display", Georgia, serif',
    fontSize: 14, lineHeight: 1.45,
    margin: '12px 0 0',
    color: '#2a261f',
    fontStyle: 'italic',
    maxWidth: 320,
  },
  section: { marginBottom: 26 },
  sectionHead: {
    display: 'flex', alignItems: 'center', gap: 8,
    marginBottom: 12,
  },
  sectionNum: {
    fontFamily: '"Playfair Display", serif', fontStyle: 'italic',
    fontSize: 14, color: '#8b1414', fontWeight: 700,
  },
  sectionLabel: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 10, letterSpacing: '0.2em',
    color: '#111', fontWeight: 600,
  },
  sectionRule: { flex: 1, borderTop: '1px solid #c8bfae', margin: '0 4px', height: 0 },
  sectionCaption: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 9, letterSpacing: '0.1em',
    color: '#7a7264',
  },
  teamList: { display: 'flex', flexDirection: 'column', gap: 6 },
  teamRow: {
    display: 'flex', alignItems: 'center',
    background: 'transparent',
    borderBottom: '1px solid #c8bfae',
    padding: '8px 0',
  },
  teamNum: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 11, color: '#8b1414', width: 28, fontWeight: 600,
  },
  teamInput: {
    flex: 1, border: 'none', background: 'transparent',
    fontFamily: '"Playfair Display", serif',
    fontSize: 20, color: '#111', outline: 'none',
    padding: 0,
  },
  teamRemove: {
    border: 'none', background: 'transparent',
    fontSize: 20, color: '#7a7264', cursor: 'pointer',
    fontFamily: '"Playfair Display", serif',
  },
  addTeam: {
    marginTop: 8, alignSelf: 'flex-start',
    border: 'none', background: 'transparent',
    display: 'flex', alignItems: 'center', gap: 8,
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 10, letterSpacing: '0.16em',
    color: '#111', cursor: 'pointer', padding: 0,
  },
  addPlus: {
    width: 18, height: 18, borderRadius: '50%',
    border: '1px solid #111',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 12,
  },
  decadeGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6,
  },
  decade: {
    border: '1px solid #111', background: 'transparent',
    fontFamily: '"Playfair Display", serif', fontStyle: 'italic',
    fontSize: 22, fontWeight: 700,
    padding: '14px 0', cursor: 'pointer',
    color: '#111',
    position: 'relative',
  },
  decadeActive: {
    background: '#111', color: '#f4efe6',
  },
  decadeCheck: {
    position: 'absolute', top: 4, right: 6,
    fontSize: 9, fontStyle: 'normal',
    fontFamily: '"JetBrains Mono", monospace',
    color: '#8b1414',
  },
  diffList: { display: 'flex', flexDirection: 'column', gap: 0 },
  diffRow: {
    display: 'grid',
    gridTemplateColumns: '28px 1fr auto 20px',
    alignItems: 'baseline',
    gap: 10, padding: '14px 0',
    borderTop: '1px solid #c8bfae',
    background: 'transparent', border: 'none',
    borderBottom: '1px solid #c8bfae',
    cursor: 'pointer', textAlign: 'left',
    fontFamily: 'inherit',
  },
  diffRowActive: {
    background: 'linear-gradient(transparent 0, transparent 100%)',
  },
  diffNum: {
    fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
    color: '#8b1414', letterSpacing: '0.1em',
  },
  diffName: {
    fontFamily: '"Playfair Display", serif', fontStyle: 'italic',
    fontSize: 22, fontWeight: 700, color: '#111',
  },
  diffSub: {
    fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
    letterSpacing: '0.16em', color: '#7a7264',
  },
  diffDot: {
    fontSize: 14, color: '#8b1414', textAlign: 'right',
  },
  genreList: {
    display: 'flex', flexWrap: 'wrap', gap: 6,
  },
  genre: {
    border: '1px solid #111', background: 'transparent',
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 10, letterSpacing: '0.14em',
    padding: '10px 14px', cursor: 'pointer',
    color: '#111',
  },
  genreActive: {
    background: '#8b1414', borderColor: '#8b1414', color: '#f4efe6',
  },
  footer: { marginTop: 36 },
  footerRule: { borderTop: '3px solid #111', marginBottom: 16 },
  startBtn: {
    width: '100%', border: 'none',
    background: '#111', color: '#f4efe6',
    padding: '20px 22px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  startText: {
    fontFamily: '"Playfair Display", serif', fontStyle: 'italic',
    fontSize: 22, fontWeight: 700,
  },
  startArrow: { fontSize: 22 },
  colophon: {
    marginTop: 14,
    display: 'flex', justifyContent: 'space-between',
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 8, letterSpacing: '0.18em', color: '#7a7264',
  },
};

window.Direction1 = Direction1;
