import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Pill } from '../components/ui/Pill'
import { ProgressBar } from '../components/ui/ProgressBar'

// M2 verification page. Renders all scripts in both type families and the component
// set, so we can confirm conjuncts/matras/laga-matra, the palette, dark mode, and the
// 3 text sizes (use the header controls) at any width incl. 320px. Not user-facing content.
export default function Styleguide() {
  return (
    <section className="page styleguide">
      <h1>Design system</h1>
      <p className="muted">
        Verification page (M2). Change text size and theme from the top bar to check every
        combination. Script samples confirm conjuncts, matras, and Gurmukhi laga-matra render
        without clipping.
      </p>

      <h2>Type &amp; scripts</h2>

      <Card>
        <p className="sg-eyebrow">Latin — Baloo 2 display / Mukta body</p>
        <p className="sg-display" lang="en">Kaarigar — sharpen the chisel</p>
        <p className="sg-body" lang="en">
          Clamp the workpiece. Keep both hands behind the cutting edge. Take thin, controlled
          shavings with a well-tuned plane.
        </p>
      </Card>

      <Card>
        <p className="sg-eyebrow">Devanagari — used by Hindi (hi) &amp; Haryanvi (bgc)</p>
        <p className="sg-display" lang="hi">कारीगर — छेनी को धार दो</p>
        <p className="sg-body" lang="hi">
          मिस्त्री · लकड़ी · श्री · क्षमता · प्रशिक्षण · द्वार — संयुक्ताक्षर और मात्राएँ सही बननी चाहिए।
        </p>
      </Card>

      <Card>
        <p className="sg-eyebrow">Gurmukhi — used by Punjabi (pa), Baloo Paaji 2 / Mukta Mahee</p>
        <p className="sg-display" lang="pa">ਕਾਰੀਗਰ — ਰੰਦਾ ਤਿੱਖਾ ਕਰੋ</p>
        <p className="sg-body" lang="pa">
          ਸਿੱਖੋ · ਲੱਕੜ · ਕਾਰੀਗਰ · ਤਰਖਾਣ · ਸੁਰੱਖਿਆ — ਲਗਾਂ-ਮਾਤਰਾਂ ਤੇ ਅੱਧਕ ਠੀਕ ਦਿਖਣੇ ਚਾਹੀਦੇ ਹਨ।
        </p>
      </Card>

      <h2>Type scale</h2>
      <Card>
        <p className="fs-3xl">Level titles 3xl</p>
        <p className="fs-2xl">Section 2xl</p>
        <p className="fs-xl">Heading xl</p>
        <p className="fs-lg">Lead lg</p>
        <p className="fs-base">Body base — the default reading size (18px)</p>
        <p className="fs-sm">Label sm</p>
        <p className="fs-xs">Caption xs</p>
      </Card>

      <h2>Colour roles</h2>
      <div className="swatch-row">
        <span className="sw sw--primary">Ground</span>
        <span className="sw sw--cta">Act</span>
        <span className="sw sw--success">Progress</span>
        <span className="sw sw--accent">Reward</span>
        <span className="sw sw--info">Focus</span>
        <span className="sw sw--danger">Danger</span>
      </div>

      <h2>Components</h2>
      <Card>
        <div className="sg-buttons">
          <Button variant="cta">▶ Start L0</Button>
          <Button variant="primary">Continue</Button>
          <Button variant="ghost">Skip</Button>
        </div>

        <div className="sg-pills">
          <Pill tone="reward">★ 3-day streak</Pill>
          <Pill tone="progress">Levels 4 / 11</Pill>
          <Pill tone="neutral">intermediate</Pill>
          <Pill tone="danger">! chisel-cut</Pill>
        </div>

        <ProgressBar value={40} label="L4 · Planing" />
        <ProgressBar value={100} label="L0 · Safety" />
      </Card>
    </section>
  )
}
