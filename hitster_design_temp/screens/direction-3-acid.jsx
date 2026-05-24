/* Direction 3: "FREQUENCY" — Bold, near-black with acid yellow + signal-red accents. */
const Direction3 = () => {
  const [teams, setTeams] = React.useState([
    { name: "ALPHA", color: "#f0ff4a" },
    { name: "BRAVO", color: "#ff3a3a" },
  ]);
  const [decades, setDecades] = React.useState(["80s", "90s", "00s", "10s"]);
  const [difficulty, setDifficulty] = React.useState("Medium");
  const [genre, setGenre] = React.useState("Alle");

  const allDecades = ["60s", "70s", "80s", "90s", "00s", "10s", "20s"];
  const genres = ["Alle", "Pop", "Rock", "Hip-Hop", "Dance", "R&B/Soul"];
  const palette = ["#f0ff4a", "#ff3a3a", "#3affc1", "#a87aff", "#ffb83a", "#6aa0ff"];

  const toggleDecade = (d) => {
    setDecades(decades.includes(d) ? decades.filter(x => x !== d) : [...decades, d]);
  };

  return (
    <div style={d3.root}>
      {/* Marquee bar */}
      <div style={d3.marquee}>
        <span>●&nbsp;&nbsp;ON AIR&nbsp;&nbsp;●</span>
        <span style={d3.marqueeMid}>FREQUENCY · 102.6 FM · COPENHAGEN</span>
        <span>{new Date().toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>

      {/* Hero */}
      <div style={d3.hero}>
        <div style={d3.heroBg}>
          <div style={d3.heroBgTrack}>FREQUENCY · A LISTENING GAME · </div>
          <div style={d3.heroBgTrack2}>FREQUENCY · A LISTENING GAME · </div>
        </div>
        <div style={d3.heroContent}>
          <div style={d3.heroLabel}>
            <span style={d3.heroDot}>●</span>
            <span>SESSION #047 / OPSÆTNING</span>
          </div>
          <h1 style={d3.heroTitle}>
            NYT<br/>
            <span style={d3.heroTitleAccent}>SPIL.</span>
          </h1>
          <p style={d3.heroDek}>
            <span style={d3.heroDekArrow}>↳</span>
            Indstil din session. Vælg hold, kalibrer årtier, justér
            sværhedsgrad — tryk udsend.
          </p>
        </div>
      </div>

      {/* Teams */}
      <Section3 num="01" label="HOLD" meta={`${teams.length} AKTIVE`}>
        <div style={d3.teamList}>
          {teams.map((t, i) => (
            <div key={i} style={{...d3.teamRow, borderLeftColor: t.color}}>
              <div style={d3.teamIdxWrap}>
                <span style={d3.teamIdx}>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <input
                style={d3.teamInput}
                value={t.name}
                onChange={(e) => {
                  const n = [...teams]; n[i] = { ...n[i], name: e.target.value.toUpperCase() }; setTeams(n);
                }}
              />
              <div style={d3.teamPalette}>
                {palette.map((c) => (
                  <button
                    key={c}
                    onClick={() => { const n = [...teams]; n[i] = { ...n[i], color: c }; setTeams(n); }}
                    style={{
                      ...d3.swatch,
                      background: c,
                      border: t.color === c ? '2px solid #fff' : '2px solid transparent',
                    }}
                  ></button>
                ))}
              </div>
            </div>
          ))}
          <button
            style={d3.addTeam}
            onClick={() => setTeams([...teams, { name: `HOLD ${teams.length + 1}`, color: palette[teams.length % palette.length] }])}
          >
            <span>+&nbsp;&nbsp;NYT HOLD</span>
            <span style={d3.addArrow}>→</span>
          </button>
        </div>
      </Section3>

      {/* Decades — slider style */}
      <Section3 num="02" label="ÅRTIER" meta={`${decades.length}/7 VALGT`}>
        <div style={d3.decadeBar}>
          {allDecades.map((d) => {
            const active = decades.includes(d);
            return (
              <button
                key={d}
                onClick={() => toggleDecade(d)}
                style={{...d3.decadeCell, ...(active ? d3.decadeCellActive : {})}}
              >
                <div style={d3.decadeBig}>{d.replace('s', '')}</div>
                <div style={d3.decadeTick}>{active ? '■' : '□'}</div>
              </button>
            );
          })}
        </div>
        <div style={d3.timeline}>
          <span>1960</span>
          <span style={d3.timelineRule}></span>
          <span>2029</span>
        </div>
      </Section3>

      {/* Difficulty */}
      <Section3 num="03" label="SVÆRHEDSGRAD" meta="ENKELT NIVEAU">
        <div style={d3.diffGrid}>
          {[
            { k: "Let", t: "STORE HITS", lvl: 1 },
            { k: "Medium", t: "KENDTE SANGE", lvl: 2 },
            { k: "Svær", t: "OBSKURT", lvl: 3 },
          ].map((opt) => {
            const active = difficulty === opt.k;
            return (
              <button
                key={opt.k}
                onClick={() => setDifficulty(opt.k)}
                style={{...d3.diffCard, ...(active ? d3.diffCardActive : {})}}
              >
                <div style={d3.diffBars}>
                  {[1,2,3].map((b) => (
                    <span
                      key={b}
                      style={{
                        ...d3.diffBar,
                        background: b <= opt.lvl
                          ? (active ? '#0d0d0d' : '#f0ff4a')
                          : (active ? 'rgba(13,13,13,0.2)' : 'rgba(240,255,74,0.15)'),
                      }}
                    ></span>
                  ))}
                </div>
                <div style={d3.diffName}>{opt.k}</div>
                <div style={d3.diffSub}>{opt.t}</div>
              </button>
            );
          })}
        </div>
      </Section3>

      {/* Genre */}
      <Section3 num="04" label="GENRE" meta="REPERTOIRE">
        <div style={d3.genreWrap}>
          {genres.map((g, i) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              style={{...d3.genreItem, ...(genre === g ? d3.genreItemActive : {})}}
            >
              <span style={d3.genreNum}>{String(i + 1).padStart(2, '0')}</span>
              <span style={d3.genreName}>{g.toUpperCase()}</span>
              <span style={d3.genreSig}>{genre === g ? '◉' : '○'}</span>
            </button>
          ))}
        </div>
      </Section3>

      {/* Launch */}
      <div style={d3.launch}>
        <div style={d3.launchTag}>SIGNAL READY</div>
        <button style={d3.launchBtn}>
          <span style={d3.launchInner}>
            <span style={d3.launchKicker}>TRYK FOR AT</span>
            <span style={d3.launchTitle}>SENDE I LUFTEN</span>
          </span>
          <span style={d3.launchSig}>
            <span style={d3.launchSigBar}></span>
            <span style={{...d3.launchSigBar, height: 18}}></span>
            <span style={{...d3.launchSigBar, height: 26}}></span>
            <span style={{...d3.launchSigBar, height: 14}}></span>
          </span>
        </button>
        <div style={d3.legal}>
          <span>EST. 2026</span>
          <span>·</span>
          <span>SIDE 01 / 01</span>
          <span>·</span>
          <span>v0.4.7</span>
        </div>
      </div>
    </div>
  );
};

const Section3 = ({ num, label, meta, children }) => (
  <div style={d3.section}>
    <div style={d3.sectionHead}>
      <div style={d3.sectionLeft}>
        <span style={d3.sectionNum}>{num}</span>
        <span style={d3.sectionLabel}>{label}</span>
      </div>
      <span style={d3.sectionMeta}>{meta}</span>
    </div>
    <div style={d3.sectionRule}></div>
    {children}
  </div>
);

const d3 = {
  root: {
    width: '100%', minHeight: '100%',
    background: '#0d0d0d',
    color: '#f4f1ea',
    fontFamily: '"Inter", system-ui, sans-serif',
    padding: 0,
    boxSizing: 'border-box',
  },
  marquee: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: '#f0ff4a', color: '#0d0d0d',
    padding: '6px 14px',
    fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
    letterSpacing: '0.16em', fontWeight: 600,
  },
  marqueeMid: { fontSize: 9 },
  hero: {
    position: 'relative',
    padding: '24px 20px 28px',
    overflow: 'hidden',
    borderBottom: '1px solid #2a2a2a',
  },
  heroBg: {
    position: 'absolute', inset: 0,
    pointerEvents: 'none', overflow: 'hidden',
    display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6,
  },
  heroBgTrack: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 76, fontWeight: 800,
    color: 'rgba(244,241,234,0.04)',
    whiteSpace: 'nowrap', letterSpacing: '-0.04em',
    transform: 'translateX(-30px)',
  },
  heroBgTrack2: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 76, fontWeight: 800,
    color: 'rgba(240,255,74,0.05)',
    whiteSpace: 'nowrap', letterSpacing: '-0.04em',
    transform: 'translateX(40px)',
  },
  heroContent: { position: 'relative', zIndex: 2 },
  heroLabel: {
    display: 'flex', alignItems: 'center', gap: 8,
    fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
    letterSpacing: '0.18em', color: '#f0ff4a',
    marginBottom: 18,
  },
  heroDot: { color: '#ff3a3a' },
  heroTitle: {
    fontFamily: '"Archivo Black", "Inter", sans-serif',
    fontSize: 96, lineHeight: 0.86, margin: 0,
    fontWeight: 900, letterSpacing: '-0.05em',
    color: '#f4f1ea',
  },
  heroTitleAccent: {
    color: '#f0ff4a',
    fontStyle: 'italic',
  },
  heroDek: {
    fontFamily: '"Inter", sans-serif',
    fontSize: 13, lineHeight: 1.5,
    margin: '18px 0 0',
    color: '#bdb8a8',
    maxWidth: 300,
  },
  heroDekArrow: { color: '#f0ff4a', marginRight: 6 },
  section: { padding: '22px 20px 8px' },
  sectionHead: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
    marginBottom: 4,
  },
  sectionLeft: { display: 'flex', alignItems: 'baseline', gap: 12 },
  sectionNum: {
    fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
    color: '#f0ff4a', fontWeight: 700, letterSpacing: '0.1em',
  },
  sectionLabel: {
    fontFamily: '"Archivo Black", sans-serif',
    fontSize: 14, letterSpacing: '0.16em', color: '#f4f1ea',
  },
  sectionMeta: {
    fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
    color: '#7a7464', letterSpacing: '0.14em',
  },
  sectionRule: {
    borderTop: '1px dashed #2a2a2a',
    marginBottom: 14, marginTop: 8,
  },
  teamList: { display: 'flex', flexDirection: 'column', gap: 6 },
  teamRow: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems: 'center', gap: 12,
    background: '#181818',
    borderLeft: '4px solid',
    padding: '12px 14px',
  },
  teamIdxWrap: {},
  teamIdx: {
    fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
    color: '#7a7464', letterSpacing: '0.1em',
  },
  teamInput: {
    background: 'transparent', border: 'none',
    fontFamily: '"Archivo Black", sans-serif',
    fontSize: 18, color: '#f4f1ea', outline: 'none',
    letterSpacing: '0.04em', padding: 0,
  },
  teamPalette: { display: 'flex', gap: 4 },
  swatch: {
    width: 14, height: 14, borderRadius: 0,
    cursor: 'pointer', padding: 0, background: '#fff',
  },
  addTeam: {
    background: 'transparent', border: '1px dashed #2a2a2a',
    color: '#f0ff4a',
    padding: '14px', cursor: 'pointer',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
    letterSpacing: '0.16em',
  },
  addArrow: { fontSize: 14 },
  decadeBar: {
    display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4,
  },
  decadeCell: {
    background: '#181818', border: 'none',
    padding: '12px 4px 8px', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
    color: '#7a7464',
  },
  decadeCellActive: {
    background: '#f0ff4a', color: '#0d0d0d',
  },
  decadeBig: {
    fontFamily: '"Archivo Black", sans-serif',
    fontSize: 16, letterSpacing: '-0.02em',
  },
  decadeTick: {
    fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
  },
  timeline: {
    display: 'flex', alignItems: 'center', gap: 8,
    marginTop: 10,
    fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
    color: '#7a7464', letterSpacing: '0.1em',
  },
  timelineRule: { flex: 1, borderTop: '1px solid #2a2a2a', height: 0 },
  diffGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6,
  },
  diffCard: {
    background: '#181818', border: 'none',
    padding: '16px 10px 14px', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8,
    color: '#f4f1ea',
  },
  diffCardActive: {
    background: '#f0ff4a', color: '#0d0d0d',
  },
  diffBars: { display: 'flex', alignItems: 'flex-end', gap: 2, height: 18 },
  diffBar: { width: 5, borderRadius: 1 },
  diffName: {
    fontFamily: '"Archivo Black", sans-serif',
    fontSize: 16, letterSpacing: '-0.01em',
  },
  diffSub: {
    fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
    letterSpacing: '0.14em', opacity: 0.7,
  },
  genreWrap: { display: 'flex', flexDirection: 'column', gap: 1 },
  genreItem: {
    background: '#181818', border: 'none',
    display: 'grid', gridTemplateColumns: 'auto 1fr auto',
    gap: 12, alignItems: 'center',
    padding: '12px 14px', cursor: 'pointer',
    color: '#f4f1ea', textAlign: 'left',
  },
  genreItemActive: {
    background: '#f4f1ea', color: '#0d0d0d',
  },
  genreNum: {
    fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
    color: 'inherit', opacity: 0.5, letterSpacing: '0.1em',
  },
  genreName: {
    fontFamily: '"Archivo Black", sans-serif',
    fontSize: 13, letterSpacing: '0.08em',
  },
  genreSig: { fontSize: 12, color: '#f0ff4a' },
  launch: { padding: '28px 20px 24px' },
  launchTag: {
    display: 'inline-block',
    background: '#ff3a3a', color: '#0d0d0d',
    padding: '4px 8px',
    fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
    letterSpacing: '0.18em', fontWeight: 700,
    marginBottom: 10,
  },
  launchBtn: {
    width: '100%', border: 'none',
    background: '#f0ff4a', color: '#0d0d0d',
    padding: '20px 20px', cursor: 'pointer',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    textAlign: 'left',
  },
  launchInner: { display: 'flex', flexDirection: 'column', gap: 2 },
  launchKicker: {
    fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
    letterSpacing: '0.18em',
  },
  launchTitle: {
    fontFamily: '"Archivo Black", sans-serif',
    fontSize: 22, letterSpacing: '-0.01em',
  },
  launchSig: { display: 'flex', alignItems: 'flex-end', gap: 3 },
  launchSigBar: {
    width: 4, height: 10, background: '#0d0d0d',
  },
  legal: {
    marginTop: 14,
    display: 'flex', justifyContent: 'center', gap: 8,
    fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
    letterSpacing: '0.18em', color: '#7a7464',
  },
};

window.Direction3 = Direction3;
