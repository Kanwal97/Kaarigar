import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'cta' | 'primary' | 'ghost'

// cta   = the ONE high-energy action per screen (orange, dark ink) — Start/Play.
// primary = standard action (sheesham). ghost = low-emphasis.
export function Button({
  variant = 'primary',
  children,
  className = '',
  ...rest
}: { variant?: Variant; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`btn btn--${variant} ${className}`.trim()} {...rest}>
      {children}
    </button>
  )
}
