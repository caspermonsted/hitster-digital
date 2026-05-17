import { useRef, useState } from 'react'

export default function DraggableCard({ onDrop, children }) {
  const cardRef = useRef(null)
  const ghostRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  function getGapElements() {
    return Array.from(document.querySelectorAll('[data-gap]'))
  }

  function getNearestGap(clientY) {
    const gaps = getGapElements()
    let nearest = null
    let minDist = Infinity
    for (const el of gaps) {
      const rect = el.getBoundingClientRect()
      const centerY = rect.top + rect.height / 2
      const dist = Math.abs(clientY - centerY)
      if (dist < minDist) { minDist = dist; nearest = el }
    }
    return nearest
  }

  function highlightGap(el) {
    getGapElements().forEach(g => g.setAttribute('data-active', 'false'))
    if (el) el.setAttribute('data-active', 'true')
  }

  function onPointerDown(e) {
    e.preventDefault()
    setDragging(true)
    cardRef.current?.setPointerCapture(e.pointerId)

    const ghost = ghostRef.current
    if (ghost) {
      ghost.style.display = 'block'
      ghost.style.left = `${e.clientX - 80}px`
      ghost.style.top = `${e.clientY - 30}px`
    }
  }

  function onPointerMove(e) {
    if (!dragging) return
    const ghost = ghostRef.current
    if (ghost) {
      ghost.style.left = `${e.clientX - 80}px`
      ghost.style.top = `${e.clientY - 30}px`
    }
    highlightGap(getNearestGap(e.clientY))
  }

  function onPointerUp(e) {
    if (!dragging) return
    setDragging(false)
    const ghost = ghostRef.current
    if (ghost) ghost.style.display = 'none'

    const nearest = getNearestGap(e.clientY)
    highlightGap(null)
    if (nearest) {
      const idx = parseInt(nearest.getAttribute('data-gap'))
      onDrop(idx)
    }
  }

  return (
    <>
      <div
        ref={cardRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{
          touchAction: 'none',
          cursor: dragging ? 'grabbing' : 'grab',
          opacity: dragging ? 0.4 : 1,
          transition: 'opacity 0.15s',
        }}
      >
        {children}
      </div>

      {/* Ghost card that follows finger/cursor */}
      <div
        ref={ghostRef}
        style={{
          display: 'none',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 1000,
          width: 160,
          background: 'var(--accent)',
          color: '#fff',
          borderRadius: 10,
          padding: '0.6rem 1rem',
          fontWeight: 700,
          fontSize: '0.9rem',
          textAlign: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}
      >
        🎵 Placer her
      </div>
    </>
  )
}
