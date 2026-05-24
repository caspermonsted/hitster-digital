import { useState } from 'react'
import Setup from './pages/Setup'
import Game from './pages/Game'

export default function App() {
  const [page, setPage] = useState('setup')
  const [gameSettings, setGameSettings] = useState(null)

  function handleStart(settings) {
    setGameSettings(settings)
    setPage('game')
  }

  function handleQuit() {
    setPage('setup')
    setGameSettings(null)
  }

  function handleDemo() {
    setGameSettings({ demo: true, teams: [{ name: 'Team 1' }, { name: 'Team 2' }], decades: ['80s', '90s', '00s', '10s'], target: 10 })
    setPage('game')
  }

  if (page === 'setup') return <Setup onStart={handleStart} onDemo={handleDemo} />
  if (page === 'game') return <Game settings={gameSettings} onQuit={handleQuit} />
  return null
}
