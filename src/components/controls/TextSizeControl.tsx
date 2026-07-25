import { usePreferences, type TextSize } from '../../lib/preferences'

const STEPS: { value: TextSize; title: string; scale: number }[] = [
  { value: 'normal', title: 'Normal text size', scale: 0.9 },
  { value: 'large', title: 'Large text size', scale: 1.15 },
  { value: 'xlarge', title: 'Extra-large text size', scale: 1.45 },
]

// 3-step control. Each "A" is rendered at its own size so the choice is self-evident
// (helpful for low-literacy users). Resizes actual content via the root font-size.
export function TextSizeControl() {
  const { textSize, setTextSize } = usePreferences()
  return (
    <div className="segmented" role="group" aria-label="Text size">
      {STEPS.map((s) => (
        <button
          key={s.value}
          type="button"
          className="segmented__btn"
          aria-pressed={textSize === s.value}
          title={s.title}
          onClick={() => setTextSize(s.value)}
        >
          <span aria-hidden="true" style={{ fontSize: `${s.scale}em` }}>A</span>
        </button>
      ))}
    </div>
  )
}
