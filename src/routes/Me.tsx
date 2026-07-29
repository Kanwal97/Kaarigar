import { useRef, useState, type ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'
import { GUIDE_KEY } from '../components/FirstRunGuide'
import { ThemeToggle } from '../components/controls/ThemeToggle'
import { TextSizeControl } from '../components/controls/TextSizeControl'
import { DataSaverControl } from '../components/controls/DataSaverControl'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useProgress } from '../lib/progress'
import { useInstallPrompt } from '../lib/useInstallPrompt'

// "Me" — settings & progress. Appearance controls + progress export/import, fully
// localised via the UI dictionary (the tab is visited often, so it must not be English-only).
export default function Me({ lang }: { lang: Locale }) {
  const navigate = useNavigate()
  function replayGuide() {
    try {
      localStorage.removeItem(GUIDE_KEY)
    } catch {
      /* ignore */
    }
    navigate(`/${lang}`)
  }
  return (
    <section className="page" lang={lang}>
      <h1>{t('nav.me', lang)}</h1>

      <Card>
        <h2>{t('me.appearance', lang)}</h2>
        <div className="setting">
          <span className="setting__label">{t('me.textSize', lang)}</span>
          <TextSizeControl />
        </div>
        <div className="setting">
          <span className="setting__label">{t('me.theme', lang)}</span>
          <ThemeToggle />
        </div>
        <div className="setting">
          <span className="setting__label">{t('me.dataSaver', lang)}</span>
          <DataSaverControl />
        </div>
        <p className="muted">{t('me.dataSaverNote', lang)}</p>
      </Card>

      <ProgressCard lang={lang} />

      <InstallCard lang={lang} />

      <Card>
        <h2>{t('me.offlineHeading', lang)}</h2>
        <p className="muted">{t('me.offlineNote', lang)}</p>
      </Card>

      <p className="muted">
        <button type="button" className="linkish" onClick={replayGuide}>
          {t('guide.replay', lang)}
        </button>
      </p>

      <p className="muted">
        <Link to="/styleguide">{t('me.designLink', lang)}</Link>
      </p>
    </section>
  )
}

function InstallCard({ lang }: { lang: Locale }) {
  const { canInstall, installed, promptInstall } = useInstallPrompt()
  if (installed) {
    return (
      <Card>
        <h2>{t('me.appHeading', lang)}</h2>
        <p className="muted">{t('me.installed', lang)}</p>
      </Card>
    )
  }
  if (!canInstall) return null
  return (
    <Card>
      <h2>{t('me.installHeading', lang)}</h2>
      <p className="muted">{t('me.installNote', lang)}</p>
      <div className="me__actions">
        <Button variant="cta" onClick={() => void promptInstall()}>
          {t('me.installHeading', lang)}
        </Button>
      </div>
    </Card>
  )
}

function ProgressCard({ lang }: { lang: Locale }) {
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
    setMsg(t('me.msgExported', lang))
  }

  async function handleImport(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    const res = importData(text)
    setMsg(res.ok ? t('me.msgImported', lang) : t('me.msgImportFail', lang))
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <Card>
      <h2>{t('me.progress', lang)}</h2>
      {hydrated ? (
        <p className="muted">
          {data.completedLessons.length} {t('me.lessonsComplete', lang)}
          {data.streak.count > 0 ? ` · 🔥 ${data.streak.count} ${t('home.dayStreak', lang)}` : ''}
        </p>
      ) : (
        <p className="muted">{t('me.loading', lang)}</p>
      )}
      <p className="muted">{t('me.noAccount', lang)}</p>
      <div className="me__actions">
        <Button variant="primary" onClick={handleExport}>
          {t('me.export', lang)}
        </Button>
        <Button variant="ghost" onClick={() => fileRef.current?.click()}>
          {t('me.import', lang)}
        </Button>
        <input ref={fileRef} type="file" accept="application/json,.json" onChange={handleImport} hidden />
      </div>
      {msg && (
        <p className="me__msg" role="status">
          {msg}
        </p>
      )}
      <p className="muted">
        <button
          type="button"
          className="linkish"
          onClick={() => {
            reset()
            setMsg(t('me.msgReset', lang))
          }}
        >
          {t('me.reset', lang)}
        </button>
      </p>
    </Card>
  )
}
