import { useRef, useState, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import type { Locale } from '../i18n/locales'
import { ThemeToggle } from '../components/controls/ThemeToggle'
import { TextSizeControl } from '../components/controls/TextSizeControl'
import { DataSaverControl } from '../components/controls/DataSaverControl'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useProgress } from '../lib/progress'
import { useInstallPrompt } from '../lib/useInstallPrompt'

// "Me" — settings & progress. Appearance controls (M2) + progress export/import (M4).
// Honest offline status arrives in M7.
export default function Me({ lang }: { lang: Locale }) {
  return (
    <section className="page" lang={lang}>
      <h1>Me</h1>

      <Card>
        <h2>Appearance</h2>
        <div className="setting">
          <span className="setting__label">Text size</span>
          <TextSizeControl />
        </div>
        <div className="setting">
          <span className="setting__label">Theme</span>
          <ThemeToggle />
        </div>
        <div className="setting">
          <span className="setting__label">Data saver</span>
          <DataSaverControl />
        </div>
        <p className="muted">Data saver shows a size warning before any video loads and skips video thumbnails.</p>
      </Card>

      <ProgressCard />

      <InstallCard />

      <Card>
        <h2>Offline</h2>
        <p className="muted">
          Once installed (or after your first visit), lessons, the glossary, tools, and checklists
          work with the network off. Video always needs internet — we say so on the lesson.
        </p>
      </Card>

      <p className="muted">
        <Link to="/styleguide">View the design system →</Link>
      </p>
    </section>
  )
}

function InstallCard() {
  const { canInstall, installed, promptInstall } = useInstallPrompt()
  if (installed) {
    return (
      <Card>
        <h2>App</h2>
        <p className="muted">Installed. Open Kaarigar from your home screen.</p>
      </Card>
    )
  }
  if (!canInstall) return null
  return (
    <Card>
      <h2>Install app</h2>
      <p className="muted">Add Kaarigar to your home screen for one-tap access and offline use.</p>
      <div className="me__actions">
        <Button variant="cta" onClick={() => void promptInstall()}>
          Install app
        </Button>
      </div>
    </Card>
  )
}

function ProgressCard() {
  const { data, hydrated, exportData, importData, reset } = useProgress()
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState('')

  function handleExport() {
    const blob = new Blob([exportData()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'kaarigar-progress.json'
    a.click()
    URL.revokeObjectURL(url)
    setMsg('Progress downloaded.')
  }

  async function handleImport(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    const res = importData(text)
    setMsg(res.ok ? 'Progress imported from your file.' : (res.error ?? 'Import failed.'))
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <Card>
      <h2>Progress</h2>
      {hydrated ? (
        <p className="muted">
          {data.completedLessons.length} lesson{data.completedLessons.length === 1 ? '' : 's'} complete
          {data.streak.count > 0 ? ` · 🔥 ${data.streak.count}-day streak` : ''}.
        </p>
      ) : (
        <p className="muted">Loading…</p>
      )}
      <p className="muted">
        No account needed. Move to a new phone by exporting your progress and importing it there.
      </p>
      <div className="me__actions">
        <Button variant="primary" onClick={handleExport}>
          Export progress
        </Button>
        <Button variant="ghost" onClick={() => fileRef.current?.click()}>
          Import progress
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          onChange={handleImport}
          hidden
        />
      </div>
      {msg && (
        <p className="me__msg" role="status">
          {msg}
        </p>
      )}
      <p className="muted">
        <button type="button" className="linkish" onClick={() => { reset(); setMsg('Progress reset.') }}>
          Reset all progress
        </button>
      </p>
    </Card>
  )
}
