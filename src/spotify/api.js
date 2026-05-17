import { getToken } from './auth'

async function apiFetch(path) {
  const token = await getToken()
  const res = await fetch(`https://api.spotify.com/v1${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (res.status === 204 || res.headers.get('content-length') === '0') return {}
  const data = await res.json()
  if (data.error) throw new Error(`Spotify: ${data.error.message} (${data.error.status})`)
  return data
}

const DECADE_RANGES = {
  '60s': [1960, 1969],
  '70s': [1970, 1979],
  '80s': [1980, 1989],
  '90s': [1990, 1999],
  '00s': [2000, 2009],
  '10s': [2010, 2019],
  '20s': [2020, 2025],
}

const POPULARITY = {
  easy:   { min: 75, max: 100 },
  medium: { min: 45, max: 100 },
  hard:   { min: 20, max: 65 },
}

// Only valid Spotify genre seed values
const GENRE_SEEDS = {
  all:       'pop,rock,hip-hop,dance,r-n-b',
  pop:       'pop,synth-pop,indie-pop',
  rock:      'rock,hard-rock,alt-rock',
  'hip-hop': 'hip-hop',
  dance:     'dance,edm,electronic',
  'r&b':     'r-n-b,soul,funk',
}

export async function fetchTracks({ decades, difficulty, genre, count = 60 }) {
  const { min } = POPULARITY[difficulty]
  const seedStr = GENRE_SEEDS[genre] || GENRE_SEEDS['all']
  // Spotify allows max 5 seeds total
  const seeds = seedStr.split(',').slice(0, 2).join(',')
  const all = []

  const debugLines = []

  for (const decade of decades) {
    const [from, to] = DECADE_RANGES[decade]
    const params = new URLSearchParams({
      seed_genres: seeds,
      min_popularity: String(min),
      limit: '100',
    })
    const url = `/recommendations?${params}`
    debugLines.push(`Kalder: ${url}`)
    const data = await apiFetch(url)
    const total = data.tracks?.length ?? 0
    debugLines.push(`${decade}: ${total} sange fra API`)
    if (data.tracks) {
      const filtered = data.tracks.filter(t => {
        if (!t.album?.release_date) return false
        const year = parseInt(t.album.release_date.slice(0, 4))
        return year >= from && year <= to
      })
      debugLines.push(`${decade}: ${filtered.length} efter årstal-filter (${from}-${to})`)
      all.push(...filtered)
    }
  }

  if (all.length === 0) throw new Error(debugLines.join('\n'))

  const seen = new Set()
  const unique = all.filter(t => {
    if (seen.has(t.id)) return false
    seen.add(t.id)
    return true
  })

  shuffle(unique)

  return unique.slice(0, count).map(t => ({
    id: t.id,
    uri: t.uri,
    title: t.name,
    artist: t.artists.map(a => a.name).join(', '),
    year: parseInt(t.album.release_date.slice(0, 4)),
    albumArt: t.album.images[1]?.url || t.album.images[0]?.url || null,
  }))
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
}
