import { Icon } from './ui/Icon'

export function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  return (
    <div className="searchbox">
      <Icon name="search" size={22} className="searchbox__icon" />
      <input
        type="search"
        className="searchbox__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  )
}
