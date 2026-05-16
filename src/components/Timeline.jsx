export default function Timeline({ cards, selectedGap, onSelectGap, disabled }) {
  // cards: [{title, artist, year, albumArt}] sorted by year
  // gaps: 0 = before first, 1 = between 0&1, ..., N = after last

  const gapCount = cards.length + 1

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {Array.from({ length: gapCount }).map((_, gapIdx) => (
        <div key={gapIdx}>
          <GapButton
            index={gapIdx}
            selected={selectedGap === gapIdx}
            onClick={() => !disabled && onSelectGap(gapIdx)}
            disabled={disabled}
            isFirst={gapIdx === 0}
            isLast={gapIdx === gapCount - 1}
            cards={cards}
          />
          {gapIdx < cards.length && (
            <TimelineCard card={cards[gapIdx]} />
          )}
        </div>
      ))}
    </div>
  )
}

function GapButton({ index, selected, onClick, disabled, isFirst, isLast, cards }) {
  const prevYear = index > 0 ? cards[index - 1].year : null
  const nextYear = index < cards.length ? cards[index].year : null

  let hint = ''
  if (isFirst && nextYear) hint = `Før ${nextYear}`
  else if (isLast && prevYear) hint = `Efter ${prevYear}`
  else if (prevYear && nextYear) hint = `${prevYear} – ${nextYear}`
  else hint = 'Her'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '0.5rem',
        background: selected ? 'var(--accent)' : 'transparent',
        border: selected ? '2px solid var(--accent)' : '2px dashed var(--border)',
        borderRadius: 8,
        color: selected ? '#fff' : 'var(--muted)',
        fontSize: '0.8rem',
        fontWeight: selected ? 700 : 400,
        margin: '3px 0',
        transition: 'all 0.15s',
      }}
    >
      {selected ? `✓ Placeret her` : `↓ ${hint}`}
    </button>
  )
}

function TimelineCard({ card }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 10,
      padding: '0.6rem 0.8rem',
    }}>
      {card.albumArt && (
        <img
          src={card.albumArt}
          alt=""
          style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }}
        />
      )}
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontSize: '0.85rem',
          fontWeight: 700,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {card.title}
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {card.artist}
        </div>
      </div>
      <div style={{
        marginLeft: 'auto',
        fontSize: '1rem',
        fontWeight: 900,
        color: 'var(--accent2)',
        flexShrink: 0,
      }}>
        {card.year}
      </div>
    </div>
  )
}
