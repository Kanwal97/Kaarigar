import { usePreferences, type DataSaverPref } from '../../lib/preferences'

const STEPS: { value: DataSaverPref; label: string }[] = [
  { value: 'auto', label: 'Auto' },
  { value: 'on', label: 'On' },
  { value: 'off', label: 'Off' },
]

// Auto = follow the connection (on for slow/metered). On = always save data. Off = never.
export function DataSaverControl() {
  const { dataSaver, setDataSaver } = usePreferences()
  return (
    <div className="segmented" role="group" aria-label="Data saver">
      {STEPS.map((s) => (
        <button
          key={s.value}
          type="button"
          className="segmented__btn segmented__btn--wide"
          aria-pressed={dataSaver === s.value}
          onClick={() => setDataSaver(s.value)}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}
