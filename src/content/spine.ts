// The learning-path spine (docs/PLAN.md §2.2). Drives the Joinery Spine on Home.
// Only L0 has authored content today; the rest render as "coming" until M8 scale-out.
// English titles here are placeholders for levels without content; L0 pulls its real
// (localised) title from content.

export interface SpineLevel {
  n: number
  id: string
  joint: string
  title: string
  hasContent: boolean
}

export const SPINE: SpineLevel[] = [
  { n: 0, id: 'l00', joint: 'anchor', title: 'Safety & workshop setup', hasContent: true },
  { n: 1, id: 'l01', joint: 'marking', title: 'Wood & sheet goods', hasContent: true },
  { n: 2, id: 'l02', joint: 'marking', title: 'Measuring & marking', hasContent: true },
  { n: 3, id: 'l03', joint: 'sawn-edge', title: 'Hand tools', hasContent: true },
  { n: 4, id: 'l04', joint: 'sawn-edge', title: 'Saw · plane · chisel', hasContent: true },
  { n: 5, id: 'l05', joint: 'mortise-tenon', title: 'Joinery', hasContent: true },
  { n: 6, id: 'l06', joint: 'butt', title: 'Fasteners & hardware', hasContent: true },
  { n: 7, id: 'l07', joint: 'dado', title: 'Power tools & machines', hasContent: true },
  { n: 8, id: 'l08', joint: 'finished-piece', title: 'Sanding & finishing', hasContent: true },
  { n: 9, id: 'l09', joint: 'carcass', title: 'Real projects', hasContent: true },
  { n: 10, id: 'l10', joint: 'finished-piece', title: 'The trade', hasContent: true },
]
