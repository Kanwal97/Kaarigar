import { useEffect, useRef, useState } from 'react'
import type { LessonVideo } from '../content/types'
import type { Locale } from '../i18n/locales'
import { t } from '../i18n/ui'
import { useDataSaver } from '../lib/useDataSaver'
import { useOnline } from '../lib/useOnline'
import { loadYouTubeApi, thumbnailUrl, watchUrl, type YTPlayer } from '../lib/youtube'

type State = 'idle' | 'playing' | 'error'

// Facade video: a thumbnail/placeholder + play button that costs nothing until the user
// taps. On tap it loads the IFrame Player API against youtube-nocookie.com. Any player
// error (incl. 101/150 embedding-disabled) falls back to a "Watch on YouTube" link. A
// plain watch link is always present too, so it works with JS disabled. (docs/PLAN.md §2.5)
export function VideoFacade({ video, title, lang }: { video: LessonVideo; title?: string; lang: Locale }) {
  const dataSaver = useDataSaver()
  const online = useOnline()
  const [state, setState] = useState<State>('idle')
  const hostRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YTPlayer | null>(null)

  useEffect(() => {
    if (state !== 'playing' || !hostRef.current) return
    let cancelled = false
    void loadYouTubeApi().then((YT) => {
      if (cancelled || !hostRef.current) return
      playerRef.current = new YT.Player(hostRef.current, {
        host: 'https://www.youtube-nocookie.com',
        videoId: video.videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          enablejsapi: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          autoplay: 1,
          start: video.startSec ?? 0,
        },
        events: {
          onError: () => setState('error'),
        },
      })
    })
    return () => {
      cancelled = true
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [state, video.videoId, video.startSec])

  const credit = video.credit ?? 'YouTube'
  const langBadge = video.lang.toUpperCase()

  if (state === 'error') {
    return (
      <div className="videofacade videofacade--error" role="alert">
        <p>{t('video.cantPlay', lang)}</p>
        <a
          className="btn btn--primary"
          href={watchUrl(video.videoId)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('video.watch', lang)}
        </a>
      </div>
    )
  }

  if (state === 'playing') {
    return (
      <div className="videofacade videofacade--playing">
        <div className="videofacade__player">
          <div ref={hostRef} />
        </div>
        <p className="videofacade__meta">
          {credit} · {langBadge} ·{' '}
          <a href={watchUrl(video.videoId)} target="_blank" rel="noopener noreferrer">
            {t('video.open', lang)}
          </a>
        </p>
      </div>
    )
  }

  if (!online) {
    return (
      <div className="videofacade videofacade--offline" role="status">
        <p>{t('video.needsInternet', lang)}</p>
        <p className="videofacade__meta">
          {credit} · {langBadge}
        </p>
      </div>
    )
  }

  return (
    <div className="videofacade">
      <button
        type="button"
        className={`videofacade__btn ${dataSaver ? 'is-datasaver' : ''}`.trim()}
        onClick={() => setState('playing')}
        style={dataSaver ? undefined : { backgroundImage: `url(${thumbnailUrl(video.videoId)})` }}
        aria-label={`${t('video.play', lang)}${title ? `: ${title}` : ''} — ${credit}`}
      >
        <span className="videofacade__play" aria-hidden="true">
          ▶
        </span>
        <span className="videofacade__cta">
          {dataSaver ? `${t('video.play', lang)} · ${t('video.dataWarn', lang)}` : t('video.play', lang)}
        </span>
      </button>
      <p className="videofacade__meta">
        {credit} · {langBadge} ·{' '}
        <a href={watchUrl(video.videoId)} target="_blank" rel="noopener noreferrer">
          {t('video.watch', lang)}
        </a>
      </p>
    </div>
  )
}
