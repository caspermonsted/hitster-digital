let audioEl = null

function getAudio() {
  if (!audioEl) {
    audioEl = new Audio()
    audioEl.volume = 0.9
  }
  return audioEl
}

export async function playSong(track) {
  const audio = getAudio()
  if (!track.previewUrl) throw new Error('No preview available for this track.')
  audio.src = track.previewUrl
  await audio.play()
}

export async function resumeSong() {
  try { await audioEl?.play() } catch (_) {}
}

export function pauseSong() {
  audioEl?.pause()
}
