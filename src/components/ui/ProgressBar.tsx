// Progress uses the green "momentum" colour for the FILL, but the % is shown in --ink
// and a ✓ appears at 100% — so progress is never communicated by colour alone (1.4.1).
export function ProgressBar({ value, label }: { value: number; label?: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)))
  const done = pct >= 100
  return (
    <div className="progress">
      {label && (
        <div className="progress__row">
          <span>{label}</span>
          <span className="progress__pct">{done ? '✓ ' : ''}{pct}%</span>
        </div>
      )}
      <div
        className="progress__track"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className="progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
