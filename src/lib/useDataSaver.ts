import { useEffect, useState } from 'react'
import { usePreferences } from './preferences'

// Minimal typing for the Network Information API (not in lib.dom).
interface NetworkInfo {
  saveData?: boolean
  effectiveType?: string
  addEventListener?: (type: 'change', cb: () => void) => void
  removeEventListener?: (type: 'change', cb: () => void) => void
}

function getConnection(): NetworkInfo | undefined {
  if (typeof navigator === 'undefined') return undefined
  return (navigator as Navigator & { connection?: NetworkInfo }).connection
}

// Effective data-saver state: the user's preference wins; 'auto' consults the browser's
// Save-Data flag and connection type (docs/PLAN.md §2.5). Only touches `navigator` inside
// an effect, so it's SSR-safe.
export function useDataSaver(): boolean {
  const { dataSaver } = usePreferences()
  const [autoSave, setAutoSave] = useState(false)

  useEffect(() => {
    const conn = getConnection()
    const compute = () =>
      setAutoSave(
        Boolean(conn?.saveData) || ['slow-2g', '2g', '3g'].includes(conn?.effectiveType ?? ''),
      )
    compute()
    conn?.addEventListener?.('change', compute)
    return () => conn?.removeEventListener?.('change', compute)
  }, [])

  if (dataSaver === 'on') return true
  if (dataSaver === 'off') return false
  return autoSave
}
