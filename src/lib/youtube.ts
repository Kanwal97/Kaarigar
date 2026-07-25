// YouTube helpers. Playback uses privacy-enhanced youtube-nocookie.com, and the IFrame
// Player API is loaded LAZILY — only after the user chooses to play — so a page with a
// video costs nothing until intent (facade pattern, docs/RESEARCH.md §1.4).

export function watchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`
}

export function thumbnailUrl(id: string): string {
  // hqdefault is small and always present.
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

// Minimal typings for the parts of the IFrame Player API we use.
export interface YTPlayer {
  destroy: () => void
}
interface YTErrorEvent {
  data: number
}
interface YTPlayerOptions {
  host?: string
  videoId?: string
  width?: string | number
  height?: string | number
  playerVars?: Record<string, string | number>
  events?: {
    onReady?: (e: { target: YTPlayer }) => void
    onError?: (e: YTErrorEvent) => void
  }
}
interface YTNamespace {
  Player: new (el: HTMLElement, opts: YTPlayerOptions) => YTPlayer
}

declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

let apiPromise: Promise<YTNamespace> | null = null

export function loadYouTubeApi(): Promise<YTNamespace> {
  if (apiPromise) return apiPromise
  apiPromise = new Promise<YTNamespace>((resolve) => {
    if (window.YT?.Player) {
      resolve(window.YT)
      return
    }
    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      if (window.YT) resolve(window.YT)
    }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
  })
  return apiPromise
}

// error codes 101 and 150 both mean the owner disallows embedded playback; 100 = removed.
export function isEmbedBlockedError(code: number): boolean {
  return code === 101 || code === 150 || code === 100
}
