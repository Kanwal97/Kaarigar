// THE SIGNATURE ELEMENT, finally drawn (docs/DESIGN.md §Signature element,
// docs/redesign/PHASE-2-IDEATION.md §2.1).
//
// Each level of the curriculum is rendered as the joint that level actually teaches.
// Every mark is two pieces — a SOCKET (fixed) and a PIN (the part that moves) — and
// completing a level SEATS the pin into the socket. Because the subject is joinery,
// progress literally is assembly.
//
// The seat is a CSS transform driven by --seat-x / --seat-y (see components.css:
// .spine__node--completed .jointmark__pin). base.css removes the travel under
// prefers-reduced-motion, so those users simply see the joint already seated — the
// DIAGRAM is the signature, the motion is garnish.
//
// `joint` values come from src/content/spine.ts.

import type { CSSProperties } from 'react'

export type JointName =
  | 'anchor'
  | 'marking'
  | 'sawn-edge'
  | 'butt'
  | 'dado'
  | 'mortise-tenon'
  | 'carcass'
  | 'finished-piece'

interface JointDef {
  /** fixed part */
  socket: string
  /** the part that travels home on completion */
  pin: string
  /** how far the pin sits out of its socket before seating */
  seat: [x: number, y: number]
}

const JOINTS: Record<JointName, JointDef> = {
  // L0 — an anchor block bedded on the ground. Safety is what everything rests on.
  anchor: {
    socket: 'M4 37h36',
    pin: 'M11 15h22v18H11zM15.5 21h13M15.5 27h13',
    seat: [0, -7],
  },
  // L1–L2 — scribe lines coming down onto a board: wood identification, measure & mark.
  marking: {
    socket: 'M5 9h34v26H5z',
    pin: 'M17 9v26M27 9v26',
    seat: [-7, 0],
  },
  // L3–L4 — a board and the sawn edge that meets it: saw, plane, chisel.
  'sawn-edge': {
    socket: 'M5 9h15v26H5z',
    pin: 'M24 9h15v26H24zM24 9l3.2 4.3-3.2 4.3 3.2 4.3-3.2 4.3 3.2 4.3-3.2 4.3',
    seat: [4, 0],
  },
  // L6 — two faces butted together, held by fasteners and hardware.
  butt: {
    socket: 'M24 9h15v26H24z',
    pin: 'M5 9h15v26H5zM12.5 17v10',
    seat: [4, 0],
  },
  // L7 — a housing cut into an upright, a shelf sliding home. Machines cut dados.
  dado: {
    socket: 'M5 5h13v13h6v9h-6v13H5z',
    pin: 'M24 18h15v9H24z',
    seat: [-6, 0],
  },
  // L5 — the joint the whole curriculum builds toward.
  'mortise-tenon': {
    socket: 'M25 6h14v32H25zM25 16h8v12h-8z',
    pin: 'M5 10h13v24H5zM18 16h9v12h-9z',
    seat: [6, 0],
  },
  // L9 — panels assembled into a carcass: real projects.
  carcass: {
    socket: 'M7 15h30v24H7zM7 28h30',
    pin: 'M4 7h36v8H4z',
    seat: [0, -6],
  },
  // L8, L10 — a finished, polished face. Sanding, finishing, and the trade.
  'finished-piece': {
    socket: 'M5 12h34v20H5z',
    pin: 'M12 27l7-10M20 27l7-10M28 27l7-10',
    seat: [-5, 5],
  },
}

export function JointMark({ joint, size = 44 }: { joint: string; size?: number }) {
  const def = JOINTS[joint as JointName] ?? JOINTS.anchor
  const [x, y] = def.seat
  return (
    <svg
      className="jointmark"
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path className="jointmark__socket" d={def.socket} />
      {/* The pin sits OUT of its socket by --seat-x/--seat-y; the completed state in
          components.css resets the transform to 0,0 and the joint closes. The matching
          `transform` attribute is the no-custom-property fallback. */}
      <path
        className="jointmark__pin"
        d={def.pin}
        style={{ '--seat-x': `${x}px`, '--seat-y': `${y}px` } as CSSProperties}
        transform={`translate(${x} ${y})`}
      />
    </svg>
  )
}
