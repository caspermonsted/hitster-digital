/* Gameplay screen — listening → placing → revealing → judging */

const SONGS = [
  { year: 1998, title: "Believe", artist: "Cher", color: "#c4533a" },
  { year: 1985, title: "Take On Me", artist: "a-ha", color: "#3a5d4a" },
  { year: 2003, title: "Crazy In Love", artist: "Beyoncé", color: "#d4a13a" },
  { year: 1971, title: "Imagine", artist: "John Lennon", color: "#5a4a8a" },
  { year: 2011, title: "Rolling In The Deep", artist: "Adele", color: "#2a4a7a" },
];

const INITIAL_TIMELINE = [
  { year: 1976, title: "Hotel California", artist: "Eagles", color: "#7a3a4a" },
  { year: 1989, title: "Like A Prayer", artist: "Madonna", color: "#3a5d4a" },
  { year: 1995, title: "Wonderwall", artist: "Oasis", color: "#2a4a7a" },
  { year: 2007, title: "Umbrella", artist: "Rihanna", color: "#a86e2a" },
];

const TEAMS = [
  { name: "Anna", color: "#c4533a", score: 3 },
  { name: "Jonas", color: "#3a5d4a", score: 2 },
];

const Gameplay = ({ tweaks }) => {
  // ─── game state ─────────────────────────────────────────────
  const [phase, setPhase] = React.useState("listening"); // listening | placed | revealed
  const [judgment, setJudgment] = React.useState(null);  // null | 'correct' | 'wrong'
  const [activeTeam, setActiveTeam] = React.useState(0);
  const [teams, setTeams] = React.useState(TEAMS);
  const [timeline, setTimeline] = React.useState(INITIAL_TIMELINE);
  const [songIdx, setSongIdx] = React.useState(0);
  const [placedSlot, setPlacedSlot] = React.useState(null);
  const song = SONGS[songIdx % SONGS.length];

  // ─── playback (mock) ────────────────────────────────────────
  const [playing, setPlaying] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const songLen = 180;
  React.useEffect(() => {
    if (!playing || phase === "revealed") return;
    const t = setInterval(() => setProgress((p) => (p + 1) % songLen), 1000);
    return () => clearInterval(t);
  }, [playing, phase]);
  const fmt = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  // ─── react to tweaks state override ─────────────────────────
  React.useEffect(() => {
    if (!tweaks.demoState || tweaks.demoState === 'auto') return;
    if (tweaks.demoState !== phase) {
      setPhase(tweaks.demoState);
      if (tweaks.demoState === 'listening') {
        setPlacedSlot(null);
        setJudgment(null);
      } else if (tweaks.demoState === 'placed') {
        setPlacedSlot((s) => s == null ? 2 : s);
        setJudgment(null);
      } else if (tweaks.demoState === 'revealed') {
        setPlacedSlot((s) => s == null ? 2 : s);
      }
    }
  }, [tweaks.demoState]);

  // ─── drag handling ──────────────────────────────────────────
  const [drag, setDrag] = React.useState(null); // {x, y, offX, offY}
  const [hoverSlot, setHoverSlot] = React.useState(null);
  const slotsRef = React.useRef([]);

  const onPointerDown = (e) => {
    if (phase !== "listening") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.setPointerCapture?.(e.pointerId);
    setDrag({
      x: e.clientX, y: e.clientY,
      offX: e.clientX - (r.left + r.width / 2),
      offY: e.clientY - (r.top + r.height / 2),
    });
    setPlaying(false);
  };
  const onPointerMove = (e) => {
    if (!drag) return;
    setDrag((d) => ({ ...d, x: e.clientX, y: e.clientY }));
    // detect slot under pointer
    const slots = slotsRef.current.filter(Boolean);
    let hit = null;
    let bestDist = Infinity;
    for (let i = 0; i < slots.length; i++) {
      const r = slots[i].getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      // only consider slots roughly within reach
      if (Math.abs(e.clientY - cy) < 140) {
        const dist = Math.abs(e.clientX - cx);
        if (dist < bestDist && dist < 80) {
          bestDist = dist;
          hit = i;
        }
      }
    }
    setHoverSlot(hit);
  };
  const onPointerUp = (e) => {
    if (!drag) return;
    if (hoverSlot != null) {
      setPlacedSlot(hoverSlot);
      setPhase("placed");
    }
    setDrag(null);
    setHoverSlot(null);
  };

  // ─── actions ────────────────────────────────────────────────
  const reveal = () => { setPhase("revealed"); setPlaying(false); };
  const judge = (correct) => {
    setJudgment(correct ? 'correct' : 'wrong');
    if (correct) {
      // insert song at placedSlot
      const next = [...timeline];
      next.splice(placedSlot, 0, song);
      setTimeline(next);
      const ts = [...teams];
      ts[activeTeam] = { ...ts[activeTeam], score: ts[activeTeam].score + 1 };
      setTeams(ts);
    }
  };
  const nextTurn = () => {
    setActiveTeam((a) => (a + 1) % teams.length);
    setSongIdx((i) => i + 1);
    setPhase("listening");
    setPlacedSlot(null);
    setJudgment(null);
    setProgress(0);
    setPlaying(true);
  };

  // ─── render ─────────────────────────────────────────────────
  const team = teams[activeTeam];
  const placedHere = (i) => phase !== "listening" && placedSlot === i;

  // build slot+card list
  const items = [];
  for (let i = 0; i <= timeline.length; i++) {
    items.push({ kind: "slot", idx: i });
    if (i < timeline.length) items.push({ kind: "card", card: timeline[i], idx: i });
  }

  return (
    <div className="app" onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
      {/* ───── header ───── */}
      <header className="hd">
        <button className="hd-back" aria-label="Pause">
          <span className="hd-back-glyph">⏸</span>
        </button>
        <div className="hd-mid">
          <div className="hd-tag">RUNDE 7 · TUR</div>
          <div className="hd-team" style={{color: team.color}}>{team.name}s hold</div>
        </div>
        <button className="hd-back" aria-label="Menu">
          <span className="hd-back-glyph">⋯</span>
        </button>
      </header>

      {/* scores */}
      <div className="scores">
        {teams.map((t, i) => (
          <div key={i} className={`score${i === activeTeam ? ' is-active' : ''}`}>
            <span className="score-dot" style={{background: t.color}}></span>
            <span className="score-name">{t.name}</span>
            <span className="score-num">{t.score}<span className="score-of">/10</span></span>
          </div>
        ))}
      </div>

      {/* ───── stage ───── */}
      <div className="stage">
        <div className={`turntable${playing && phase === "listening" ? ' is-spinning' : ''}`}>
          <div className="tt-disc">
            <div className="tt-grooves"></div>
            <div className="tt-label" style={{background: song.color}}>
              {phase === "revealed" ? <span className="tt-year">{song.year}</span> : "♪"}
            </div>
            <div className="tt-hole"></div>
          </div>
          <div className="tt-arm"></div>
        </div>

        {/* the floating card (mystery or revealed) */}
        {phase === "listening" && !drag && (
          <MysteryCard onPointerDown={onPointerDown} />
        )}
        {phase === "listening" && drag && (
          <MysteryCard
            floating
            style={{
              left: drag.x - drag.offX,
              top: drag.y - drag.offY,
              transform: 'translate(-50%, -50%) rotate(-4deg)',
            }}
          />
        )}
      </div>

      {/* playback strip */}
      {phase !== "revealed" && (
        <div className="playback">
          <button className="play-btn" onClick={() => setPlaying(p => !p)}>
            {playing ? "❚❚" : "▶"}
          </button>
          <div className="playback-bar">
            <div className="playback-fill" style={{width: `${(progress/songLen)*100}%`}}></div>
          </div>
          <div className="playback-time">{fmt(progress)}</div>
        </div>
      )}

      {/* hint */}
      <div className="hint">
        {phase === "listening" && (
          <>
            <span className="hint-arrow">↓</span>
            <span>Lyt — og træk kortet ned i tidslinjen.</span>
          </>
        )}
        {phase === "placed" && (
          <>
            <span className="hint-arrow">·</span>
            <span><em>Placeret.</em> Diskutér titel og kunstner — afslør så svaret.</span>
          </>
        )}
        {phase === "revealed" && (
          <>
            <span className="hint-arrow">·</span>
            <span>Gættede I på titel eller kunstner?</span>
          </>
        )}
      </div>

      {/* ───── timeline ───── */}
      <div className="tl-wrap">
        <div className="tl-head">
          <span className="tl-num">A1</span>
          <span className="tl-title"><em>Tidslinje</em></span>
          <span className="tl-sub">{timeline.length} KORT · {team.name.toUpperCase()}</span>
        </div>
        <div className="tl-rule"></div>
        <div className="tl-scroll">
          <div className="tl-row">
            {items.map((it, i) => {
              if (it.kind === "slot") {
                const j = it.idx;
                const active = hoverSlot === j;
                const placed = placedHere(j);
                return (
                  <div
                    key={`s${j}`}
                    className={`slot${active ? ' is-active' : ''}${placed ? ' is-placed' : ''}`}
                    ref={(el) => (slotsRef.current[j] = el)}
                  >
                    {placed
                      ? (phase === "revealed"
                          ? <RevealedCard song={song} judgment={judgment} />
                          : <MysteryCard nested placed />)
                      : <div className="slot-inner"><span className="slot-glyph">+</span></div>
                    }
                  </div>
                );
              }
              return <TimelineCard key={`c${it.idx}`} card={it.card} />;
            })}
          </div>
        </div>
      </div>

      {/* ───── actions ───── */}
      <div className="actions">
        {phase === "listening" && (
          <button className="act act-ghost" disabled>
            <span className="act-kicker">VENTER</span>
            <span className="act-title">Træk kortet til en plads</span>
          </button>
        )}
        {phase === "placed" && (
          <button className="act act-primary" onClick={reveal}>
            <span className="act-kicker">KLAR?</span>
            <span className="act-title">Afslør sangen</span>
            <span className="act-arrow">→</span>
          </button>
        )}
        {phase === "revealed" && judgment == null && (
          <div className="act-pair">
            <button className="act act-wrong" onClick={() => judge(false)}>
              <span className="act-sym">✕</span>
              <span>Forkert</span>
            </button>
            <button className="act act-right" onClick={() => judge(true)}>
              <span className="act-sym">✓</span>
              <span>Korrekt</span>
            </button>
          </div>
        )}
        {phase === "revealed" && judgment != null && (
          <button className="act act-primary" onClick={nextTurn}>
            <span className="act-kicker">{judgment === 'correct' ? '+1 KORT' : 'INGEN GEVINST'}</span>
            <span className="act-title">Næste hold</span>
            <span className="act-arrow">→</span>
          </button>
        )}
      </div>
    </div>
  );
};

// ─── card components ──────────────────────────────────────────
const MysteryCard = React.forwardRef(({ onPointerDown, floating, nested, placed, style }, ref) => (
  <div
    ref={ref}
    className={`card mystery${floating ? ' is-floating' : ''}${nested ? ' is-nested' : ''}${placed ? ' is-placed' : ''}`}
    onPointerDown={onPointerDown}
    style={style}
  >
    <div className="card-corner">SIDE A</div>
    <div className="card-mark">?</div>
    <div className="card-foot">AFSPILLER…</div>
    {!nested && <div className="card-handle">↕ TRÆK</div>}
  </div>
));

const TimelineCard = ({ card }) => (
  <div className="card tl-card">
    <div className="card-corner-dot" style={{background: card.color}}></div>
    <div className="card-year"><em>{card.year}</em></div>
    <div className="card-meta">
      <div className="card-artist">{card.artist}</div>
      <div className="card-title">{card.title}</div>
    </div>
  </div>
);

const RevealedCard = ({ song, judgment }) => (
  <div className={`card revealed${judgment === 'wrong' ? ' is-wrong' : ''}${judgment === 'correct' ? ' is-correct' : ''}`}>
    <div className="card-corner-dot" style={{background: song.color}}></div>
    <div className="card-year"><em>{song.year}</em></div>
    <div className="card-meta">
      <div className="card-artist">{song.artist}</div>
      <div className="card-title">{song.title}</div>
    </div>
    {judgment === 'correct' && <div className="card-stamp">KEEPER</div>}
    {judgment === 'wrong' && <div className="card-stamp card-stamp-wrong">FORKERT</div>}
  </div>
);

window.Gameplay = Gameplay;
