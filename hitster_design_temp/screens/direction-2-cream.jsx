/* Direction 2: "SIDE A" — Warm cream gallery editorial. Pistachio/cream + oxblood + ink. */
const Direction2 = () => {
  const [teams, setTeams] = React.useState([
    { name: "Anna", color: "#c4533a" },
    { name: "Jonas", color: "#3a5d4a" },
  ]);
  const [decades, setDecades] = React.useState(["80s", "90s", "00s", "10s"]);
  const [difficulty, setDifficulty] = React.useState("Medium");
  const [genre, setGenre] = React.useState("Alle genrer");

  const allDecades = ["60s", "70s", "80s", "90s", "00s", "10s", "20s"];
  const genres = ["Alle genrer", "Pop", "Rock", "Hip-Hop", "Dance", "R&B/Soul"];
  const colors = ["#c4533a", "#3a5d4a", "#d4a13a", "#5a4a8a", "#2a4a7a", "#a8527a"];

  const toggleDecade = (d) => {
    setDecades(decades.includes(d) ? decades.filter(x => x !== d) : [...decades, d]);
  };

  return (
    <div style={d2.root}>
      {/* Header strip */}
      <div style={d2.topStrip}>
        <span style={d2.topLeft}>SIDE A · TRACKLISTE</span>
        <span style={d2.topCenter}>◐</span>
        <span style={d2.topRight}>33⅓ RPM</span>
      </div>

      {/* Big record-sleeve hero */}
      <div style={d2.hero}>
        <div style={d2.heroNumber}>01</div>
        <div style={d2.heroLines}>
          <div style={d2.heroEyebrow}>EN NY UDGIVELSE</div>
          <h1 style={d2.heroTitle}>Nyt<br/>spil</h1>
          <div style={d2.heroByline}>
            <span style={d2.heroByItalic}>komponeret af</span> &nbsp;DIG &amp; DINE GÆSTER
          </div>
        </div>
        <div style={d2.sleeveWrap}>
          <div style={d2.sleeve}>
            <div style={d2.sleeveRing}></div>
            <div style={d2.sleeveRing2}></div>
            <div style={d2.sleeveLabel}></div>
            <div style={d2.sleeveHole}></div>
          </div>
        </div>
      </div>

      {/* Teams */}
      <Section2 number="A1" title="Optrædende" sub="Tilføj op til 6 hold">
        <div style={d2.teamList}>
          {teams.map((t, i) => (
            <div key={i} style={d2.teamCard}>
              <div style={{...d2.teamAvatar, background: t.color}}>
                {t.name.charAt(0).toUpperCase()}
              </div>
              <div style={d2.teamMain}>
                <input
                  style={d2.teamInput}
                  value={t.name}
                  onChange={(e) => {
                    const n = [...teams]; n[i] = { ...n[i], name: e.target.value }; setTeams(n);
                  }}
                />
                <div style={d2.teamSwatches}>
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => { const n = [...teams]; n[i] = { ...n[i], color: c }; setTeams(n); }}
                      style={{
                        ...d2.swatch,
                        background: c,
                        outline: t.color === c ? '1.5px solid #1a1612' : 'none',
                        outlineOffset: 2,
                      }}
                    ></button>
                  ))}
                </div>
              </div>
              <span style={d2.teamIndex}>{String(i + 1).padStart(2, '0')}</span>
            </div>
          ))}
          <button
            style={d2.addTeam}
            onClick={() => setTeams([...teams, { name: `Hold ${teams.length + 1}`, color: colors[teams.length % colors.length] }])}
          >
            <span style={d2.addCircle}>+</span>
            <span>Tilføj endnu et hold</span>
          </button>
        </div>
      </Section2>

      {/* Decades */}
      <Section2 number="A2" title="Årtier" sub={`${decades.length} valgt · 1960–2029`}>
        <div style={d2.decadeRow}>
          {allDecades.map((d) => {
            const active = decades.includes(d);
            return (
              <button
                key={d}
                onClick={() => toggleDecade(d)}
                style={{...d2.decadeChip, ...(active ? d2.decadeChipActive : {})}}
              >
                <span style={d2.decadeNum}>{d.replace('s', '')}</span>
                <span style={d2.decadeS}>'s</span>
              </button>
            );
          })}
        </div>
      </Section2>

      {/* Difficulty */}
      <Section2 number="A3" title="Sværhedsgrad" sub="Kun ét niveau pr. session">
        <div style={d2.diffStack}>
          {[
            { k: "Let", t: "Store hits", desc: "De sange alle kender." },
            { k: "Medium", t: "Kendte sange", desc: "Et passende selskab." },
            { k: "Svær", t: "Obskurt", desc: "Kun for entusiaster." },
          ].map((opt) => {
            const active = difficulty === opt.k;
            return (
              <button
                key={opt.k}
                onClick={() => setDifficulty(opt.k)}
                style={{...d2.diffCard, ...(active ? d2.diffCardActive : {})}}
              >
                <div style={d2.diffLeft}>
                  <div style={d2.diffTitle}>{opt.k}</div>
                  <div style={d2.diffMeta}>{opt.t} · <span style={d2.diffDesc}>{opt.desc}</span></div>
                </div>
                <div style={{...d2.diffMark, ...(active ? d2.diffMarkActive : {})}}>
                  {active ? '●' : '○'}
                </div>
              </button>
            );
          })}
        </div>
      </Section2>

      {/* Genre */}
      <Section2 number="A4" title="Repertoire" sub="Genrer">
        <div style={d2.genreFlow}>
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              style={{...d2.genrePill, ...(genre === g ? d2.genrePillActive : {})}}
            >
              {g}
            </button>
          ))}
        </div>
      </Section2>

      {/* Footer */}
      <div style={d2.footer}>
        <button style={d2.startBtn}>
          <div style={d2.startLeft}>
            <div style={d2.startKicker}>Tryk for at sætte nålen</div>
            <div style={d2.startTitle}>Begynd spillet</div>
          </div>
          <div style={d2.startPlay}>▶</div>
        </button>
        <div style={d2.colophon}>
          <span>UDGIVET PÅ HUSETS FORLAG</span>
          <span>·</span>
          <span>MMXXVI</span>
        </div>
      </div>
    </div>
  );
};

const Section2 = ({ number, title, sub, children }) => (
  <div style={d2.section}>
    <div style={d2.sectionHead}>
      <div style={d2.sectionLeft}>
        <span style={d2.sectionNum}>{number}</span>
        <h2 style={d2.sectionTitle}>{title}</h2>
      </div>
      <span style={d2.sectionSub}>{sub}</span>
    </div>
    <div style={d2.sectionRule}></div>
    <div style={d2.sectionBody}>{children}</div>
  </div>
);

const d2 = {
  root: {
    width: '100%', minHeight: '100%',
    background: '#efe7d3',
    color: '#1a1612',
    fontFamily: '"Inter", system-ui, sans-serif',
    padding: '14px 20px 28px',
    boxSizing: 'border-box',
  },
  topStrip: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.18em',
    color: '#7a3a1a',
    padding: '8px 0', borderBottom: '1px solid #d4c8a8',
    marginBottom: 18,
  },
  topLeft: {},
  topCenter: { fontSize: 14 },
  topRight: {},
  hero: {
    position: 'relative',
    padding: '14px 0 30px',
    marginBottom: 30,
    borderBottom: '1px solid #d4c8a8',
  },
  heroNumber: {
    fontFamily: '"Playfair Display", serif', fontStyle: 'italic',
    fontSize: 14, color: '#7a3a1a', fontWeight: 600,
  },
  heroLines: { position: 'relative', zIndex: 2 },
  heroEyebrow: {
    fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
    letterSpacing: '0.2em', color: '#7a3a1a',
    marginTop: 4,
  },
  heroTitle: {
    fontFamily: '"Playfair Display", serif',
    fontWeight: 900,
    fontSize: 88, lineHeight: 0.88,
    margin: '4px 0 12px',
    letterSpacing: '-0.04em',
    color: '#1a1612',
  },
  heroByline: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 10, letterSpacing: '0.16em',
    color: '#1a1612',
  },
  heroByItalic: {
    fontFamily: '"Playfair Display", serif', fontStyle: 'italic',
    fontSize: 13, letterSpacing: 0, textTransform: 'none',
  },
  sleeveWrap: {
    position: 'absolute', right: -30, top: 16,
    pointerEvents: 'none',
  },
  sleeve: {
    width: 150, height: 150, borderRadius: '50%',
    background: 'radial-gradient(circle at 50% 50%, #2a221c 0 35%, #181410 35% 100%)',
    position: 'relative',
    boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
    opacity: 0.5,
  },
  sleeveRing: {
    position: 'absolute', inset: 22, borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  sleeveRing2: {
    position: 'absolute', inset: 38, borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  sleeveLabel: {
    position: 'absolute', inset: '50% 50%',
    width: 52, height: 52, marginLeft: -26, marginTop: -26,
    borderRadius: '50%', background: '#c4533a',
  },
  sleeveHole: {
    position: 'absolute', inset: '50% 50%',
    width: 6, height: 6, marginLeft: -3, marginTop: -3,
    borderRadius: '50%', background: '#efe7d3',
  },
  section: { marginBottom: 28 },
  sectionHead: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
    marginBottom: 4,
  },
  sectionLeft: { display: 'flex', alignItems: 'baseline', gap: 10 },
  sectionNum: {
    fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
    letterSpacing: '0.18em', color: '#7a3a1a',
    border: '1px solid #7a3a1a', padding: '2px 6px',
  },
  sectionTitle: {
    fontFamily: '"Playfair Display", serif',
    fontSize: 26, fontWeight: 800, fontStyle: 'italic',
    margin: 0, letterSpacing: '-0.02em',
  },
  sectionSub: {
    fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
    letterSpacing: '0.14em', color: '#7a6a4a',
  },
  sectionRule: {
    borderTop: '1px solid #1a1612',
    marginBottom: 14, marginTop: 6,
  },
  sectionBody: {},
  teamList: { display: 'flex', flexDirection: 'column', gap: 8 },
  teamCard: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    gap: 12, alignItems: 'center',
    background: '#f7f1e0', padding: '12px 14px',
    border: '1px solid #d4c8a8',
  },
  teamAvatar: {
    width: 42, height: 42, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: '"Playfair Display", serif', fontStyle: 'italic',
    fontWeight: 800, fontSize: 22, color: '#fff',
  },
  teamMain: { display: 'flex', flexDirection: 'column', gap: 6 },
  teamInput: {
    border: 'none', background: 'transparent',
    fontFamily: '"Playfair Display", serif',
    fontSize: 18, fontWeight: 700, color: '#1a1612', outline: 'none',
    padding: 0,
  },
  teamSwatches: { display: 'flex', gap: 6 },
  swatch: {
    width: 14, height: 14, borderRadius: '50%',
    border: 'none', cursor: 'pointer', padding: 0,
  },
  teamIndex: {
    fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
    color: '#7a6a4a', letterSpacing: '0.1em',
  },
  addTeam: {
    background: 'transparent', border: '1px dashed #1a1612',
    padding: '14px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center',
    fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
    letterSpacing: '0.16em', color: '#1a1612',
  },
  addCircle: {
    width: 20, height: 20, borderRadius: '50%',
    background: '#1a1612', color: '#efe7d3',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 12,
  },
  decadeRow: {
    display: 'flex', flexWrap: 'wrap', gap: 6,
  },
  decadeChip: {
    border: '1px solid #1a1612', background: 'transparent',
    padding: '10px 14px', cursor: 'pointer',
    display: 'flex', alignItems: 'baseline', gap: 2,
    fontFamily: '"Playfair Display", serif',
    color: '#1a1612',
  },
  decadeChipActive: {
    background: '#1a1612', color: '#efe7d3',
  },
  decadeNum: { fontSize: 22, fontWeight: 800, fontStyle: 'italic' },
  decadeS: { fontSize: 13, fontStyle: 'italic' },
  diffStack: { display: 'flex', flexDirection: 'column', gap: 6 },
  diffCard: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 16px',
    background: '#f7f1e0', border: '1px solid #d4c8a8',
    cursor: 'pointer', textAlign: 'left',
    fontFamily: 'inherit',
  },
  diffCardActive: {
    background: '#1a1612', color: '#efe7d3',
    borderColor: '#1a1612',
  },
  diffLeft: { display: 'flex', flexDirection: 'column', gap: 4 },
  diffTitle: {
    fontFamily: '"Playfair Display", serif', fontWeight: 800,
    fontSize: 22, fontStyle: 'italic',
  },
  diffMeta: {
    fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
    letterSpacing: '0.12em',
  },
  diffDesc: { fontFamily: '"Playfair Display", serif', fontStyle: 'italic', letterSpacing: 0, fontSize: 12 },
  diffMark: { fontSize: 18 },
  diffMarkActive: { color: '#c4533a' },
  genreFlow: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  genrePill: {
    border: '1px solid #1a1612', background: 'transparent',
    padding: '10px 16px', borderRadius: 999,
    fontFamily: '"Playfair Display", serif', fontStyle: 'italic',
    fontSize: 16, fontWeight: 600, cursor: 'pointer',
    color: '#1a1612',
  },
  genrePillActive: {
    background: '#c4533a', borderColor: '#c4533a', color: '#fff',
  },
  footer: { marginTop: 30 },
  startBtn: {
    width: '100%', border: '1px solid #1a1612',
    background: '#1a1612', color: '#efe7d3',
    padding: '18px 20px', cursor: 'pointer',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    textAlign: 'left',
  },
  startLeft: {},
  startKicker: {
    fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
    letterSpacing: '0.18em', color: '#d4a13a', marginBottom: 4,
  },
  startTitle: {
    fontFamily: '"Playfair Display", serif', fontStyle: 'italic',
    fontSize: 26, fontWeight: 800,
  },
  startPlay: {
    width: 46, height: 46, borderRadius: '50%',
    background: '#c4533a', color: '#efe7d3',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 18,
  },
  colophon: {
    marginTop: 12,
    display: 'flex', justifyContent: 'center', gap: 10,
    fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
    letterSpacing: '0.18em', color: '#7a6a4a',
  },
};

window.Direction2 = Direction2;
