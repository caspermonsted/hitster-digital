/* Gameplay (landscape) — full timeline visible, vinyl spinning, drag to drop */

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
  const [phase, setPhase] = React.useState("listening");
  const [judgment, setJudgment] = React.useState(null);
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

  // ─── demo state override ────────────────────────────────────
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

  // ─── drag ───────────────────────────────────────────────────
  const [drag, setDrag] = React.useState(null);
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
    const slots = slotsRef.current.filter(Boolean);
    let hit = null, bestDist = Infinity;
    for (let i = 0; i < slots.length; i++) {
      const r = slots[i].getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      if (Math.abs(e.clientY - cy) < 200) {
        const dist = Math.abs(e.clientX - cx);
        if (dist < bestDist && dist < 90) {
          bestDist = dist;
          hit = i;
        }
      }
    }
    setHoverSlot(hit);
  };
  const onPointerUp = () => {
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

  // build timeline items: slot, card, slot, card, ..., slot
  const items = [];
  for (let i = 0; i <= timeline.length; i++) {
    items.push({ kind: "slot", idx: i });
    if (i < timeline.length) items.push({ kind: "card", card: timeline[i], idx: i });
  }
  // also add visual placeholders for "cards yet to win" so the user sees 10 total
  const remaining = Math.max(0, 10 - timeline.length);

  return (
    <div className="app" onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
      {/* ───── header ───── */}
      <header className="hd">
        <div className="hd-left">
          <button className="hd-btn" aria-label="Pause">⏸</button>
          <div className="hd-meta">
            <div className="hd-tag">ROUND 7 · TURN</div>
            <div className="hd-team" style={{color: team.color}}>{team.name}’s team</div>
          </div>
        </div>
        <div className="hd-scores">
          {teams.map((t, i) => (
            <div key={i} className={`score${i === activeTeam ? ' is-active' : ''}`}>
              <span className="score-dot" style={{background: t.color}}></span>
              <span className="score-name">{t.name}</span>
              <span className="score-num">{t.score}<span className="score-of">/10</span></span>
            </div>
          ))}
        </div>
        <button className="hd-btn" aria-label="Menu">⋯</button>
      </header>

      {/* ───── stage ───── */}
      <section className="stage">
        <div className="stage-left">
          <div className={`turntable${playing && phase === "listening" ? ' is-spinning' : ''}`}>
            <div className="tt-disc">
              <div className="tt-label" style={{background: song.color}}>
                {phase === "revealed" ? <span className="tt-year">{song.year}</span> : "♪"}
              </div>
              <div className="tt-hole"></div>
            </div>
            <div className="tt-arm"></div>
          </div>
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

        <div className="stage-mid">
          <div className="np">
            <div className="np-tag">NOW PLAYING</div>
            <div className="np-title">
              {phase === "revealed" ? (
                <><em>{song.title}</em></>
              ) : (
                <em>?</em>
              )}
            </div>
            <div className="np-artist">
              {phase === "revealed" ? song.artist : "unknown artist"}
            </div>
          </div>

          {phase !== "revealed" && (
            <div className="playback">
              <button className="play-btn" onClick={() => setPlaying(p => !p)}>
                {playing ? "❚❚" : "▶"}
              </button>
              <div className="playback-bar">
                <div className="playback-fill" style={{width: `${(progress/songLen)*100}%`}}></div>
              </div>
              <div className="playback-time">{fmt(progress)} <span>/ {fmt(songLen)}</span></div>
            </div>
          )}

          <div className="hint">
            {phase === "listening" && (
              <>
                <span className="hint-arrow">↓</span>
                <span>Listen — then drag the card onto the timeline.</span>
              </>
            )}
            {phase === "placed" && (
              <>
                <span className="hint-arrow">·</span>
                <span><em>Placed.</em> Discuss title and artist — then reveal the answer.</span>
              </>
            )}
            {phase === "revealed" && judgment == null && (
              <>
                <span className="hint-arrow">·</span>
                <span>Did you guess the title <em>or</em> the artist?</span>
              </>
            )}
            {phase === "revealed" && judgment === 'correct' && (
              <><span className="hint-arrow" style={{color: 'var(--green)'}}>✓</span><span><em>Correctly placed.</em> The card is yours.</span></>
            )}
            {phase === "revealed" && judgment === 'wrong' && (
              <><span className="hint-arrow">✕</span><span><em>No win.</em> Card returned to the deck.</span></>
            )}
          </div>
        </div>

        <div className="stage-right">
          <div className="actions">
            {phase === "listening" && (
              <div className="act act-ghost">
                <span className="act-kicker">WAITING</span>
                <span className="act-title">Drag the card to a slot</span>
              </div>
            )}
            {phase === "placed" && (
              <button className="act act-primary" onClick={reveal}>
                <span className="act-kicker">READY?</span>
                <span className="act-title">Reveal the song</span>
                <span className="act-arrow">→</span>
              </button>
            )}
            {phase === "revealed" && judgment == null && (
              <div className="act-pair">
                <button className="act act-wrong" onClick={() => judge(false)}>
                  <span className="act-sym">✕</span>
                  <span>Wrong</span>
                </button>
                <button className="act act-right" onClick={() => judge(true)}>
                  <span className="act-sym">✓</span>
                  <span>Correct</span>
                </button>
              </div>
            )}
            {phase === "revealed" && judgment != null && (
              <button className="act act-primary" onClick={nextTurn}>
                <span className="act-kicker">{judgment === 'correct' ? '+1 CARD' : 'NO WIN'}</span>
                <span className="act-title">Next team</span>
                <span className="act-arrow">→</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ───── timeline ───── */}
      <section className="tl-wrap">
        <div className="tl-head">
          <span className="tl-num">A1</span>
          <span className="tl-title"><em>Timeline</em></span>
          <span className="tl-axis"><span className="tl-axis-line"></span></span>
          <span className="tl-sub">{teams[activeTeam].score}/10 CARDS · {team.name.toUpperCase()}</span>
        </div>
        <div className="tl-row">
          {items.map((it, i) => {
            if (it.kind === "slot") {
              const j = it.idx;
              const active = hoverSlot === j;
              const placed = phase !== "listening" && placedSlot === j;
              return (
                <div
                  key={`s${j}`}
                  className={`slot${active ? ' is-active' : ''}${placed ? ' is-placed' : ''}`}
                  ref={(el) => (slotsRef.current[j] = el)}
                >
                  {placed
                    ? (phase === "revealed"
                        ? <PlacedCard song={song} judgment={judgment} />
                        : <PlacedCard song={null} />)
                    : <div className="slot-inner"></div>
                  }
                </div>
              );
            }
            return <TimelineCard key={`c${it.idx}`} card={it.card} />;
          })}
          {/* trailing placeholders for cards yet to be won */}
          {Array.from({ length: remaining }, (_, i) => (
            <div key={`empty-${i}`} className="card-placeholder"></div>
          ))}
        </div>
        <div className="tl-foot">
          <span>← EARLIER</span>
          <span>LATER →</span>
        </div>
      </section>
    </div>
  );
};

// ─── cards ────────────────────────────────────────────────────
const MysteryCard = ({ onPointerDown, floating, style }) => (
  <div
    className={`card mystery${floating ? ' is-floating' : ''}`}
    onPointerDown={onPointerDown}
    style={style}
  >
    <div className="card-corner">SIDE A</div>
    <div className="card-mark">?</div>
    <div className="card-foot">PLAYING…</div>
    {!floating && <div className="card-handle">↕ DRAG</div>}
  </div>
);

// timeline card — year, artist, title
const TimelineCard = ({ card }) => (
  <div className="tlc">
    <div className="tlc-dot" style={{background: card.color}}></div>
    <div className="tlc-year"><em>{card.year}</em></div>
    <div className="tlc-meta">
      <div className="tlc-artist">{card.artist}</div>
      <div className="tlc-title">{card.title}</div>
    </div>
  </div>
);

const PlacedCard = ({ song, judgment }) => (
  <div className={`tlc placed${song ? '' : ' is-mystery'}${judgment === 'wrong' ? ' is-wrong' : ''}${judgment === 'correct' ? ' is-correct' : ''}`}>
    {song ? (
      <>
        <div className="tlc-dot" style={{background: song.color}}></div>
        <div className="tlc-year"><em>{song.year}</em></div>
        <div className="tlc-meta">
          <div className="tlc-artist">{song.artist}</div>
          <div className="tlc-title">{song.title}</div>
        </div>
      </>
    ) : (
      <>
        <div className="tlc-mystery-mark">?</div>
      </>
    )}
  </div>
);

window.Gameplay = Gameplay;
