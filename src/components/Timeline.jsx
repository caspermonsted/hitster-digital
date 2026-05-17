export default function Timeline({ cards, selectedGap, onSelectGap, disabled }) {
  const gapCount = cards.length + 1

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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

function GapButton({ index, selected, onClick, isFirst, isLast, cards, disabled }) {
  const prevYear = index > 0 ? cards[index - 1].year : null
  const nextYear = index < cards.length ? cards[index].year : null

  let hint = ''
  if (isFirst && nextYear) hint = `Før ${nextYear}`
  else if (isLast && prevYear) hint = `Efter ${prevYear}`
  else if (prevYear && nextYear) hint = `${prevYear} – ${nextYear}`
  else hint = 'Her'

  return (
    <div
      data-gap={index}
      data-active="false"
      onClick={onClick}
      style={{
        width: '100%',
        padding: '0.5rem',
        background: selected ? 'rgba(255,45,85,0.15)' : 'transparent',
        border: `2px ${selected ? 'solid' : 'dashed'} ${selected ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 10,
        color: selected ? 'var(--accent)' : 'var(--text3)',
        fontSize: '0.8rem',
        fontWeight: selected ? 700 : 400,
        margin: '3px 0',
        transition: 'all 0.15s',
        cursor: disabled ? 'default' : 'pointer',
        textAlign: 'center',
        letterSpacing: selected ? '-0.01em' : '0',
      }}
    >
      {selected ? `✓ Placeret her` : `↓ ${hint}`}
    </div>
  )
}

function TimelineCard({ card }) {
  if (card.isAnchor) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        background: 'rgba(255,159,10,0.08)',
        border: '1.5px solid rgba(255,159,10,0.4)',
        borderRadius: 10,
        padding: '0.6rem 0.8rem',
        margin: '2px 0',
      }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--accent2)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Startår</span>
        <span style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--accent2)' }}>{card.year}</span>
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 10,
      padding: '0.6rem 0.75rem',
      margin: '2px 0',
    }}>
      {card.albumArt
        ? <img src={card.albumArt} alt="" style={{ width: 42, height: 42, borderRadius: 7, objectFit: 'cover', flexShrink: 0 }} />
        : <div style={{ width: 42, height: 42, borderRadius: 7, background: 'var(--card2)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>🎵</div>
      }
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {card.title}
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '0.1rem' }}>
          {card.artist}
        </div>
      </div>
      <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--accent2)', flexShrink: 0 }}>
        {card.year}
      </div>
    </div>
  )
}
