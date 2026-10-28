import { Search } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { SUBURB_OPTIONS, type SuburbOption } from './suburbOptions'

type SuburbSearchSelectProps = {
  id?: string
  name?: string
  onSelectedChange?: (suburb: SuburbOption | null) => void
}

export function SuburbSearchSelect({
  id: idProp,
  name = 'sendingSuburb',
  onSelectedChange,
}: SuburbSearchSelectProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const listboxId = `${id}-listbox`
  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<SuburbOption | null>(null)

  const displayValue = selected?.label ?? query

  const filteredOptions = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return SUBURB_OPTIONS
    return SUBURB_OPTIONS.filter((option) =>
      option.label.toLowerCase().includes(normalized),
    )
  }, [query])

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [open])

  const selectOption = (option: SuburbOption) => {
    setSelected(option)
    setQuery('')
    setOpen(false)
    onSelectedChange?.(option)
  }

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={selected?.value ?? ''} readOnly aria-hidden />

      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ppg-label"
        strokeWidth={2}
        aria-hidden
      />

      <input
        id={id}
        type="search"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listboxId}
        autoComplete="off"
        placeholder="Search suburb"
        value={displayValue}
        onChange={(event) => {
          setQuery(event.target.value)
          setSelected(null)
          onSelectedChange?.(null)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        className="booking-search-input"
      />

      {open && filteredOptions.length > 0 ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={id}
          className="absolute z-20 mt-1 max-h-[min(220px,40vh)] w-full overflow-y-auto rounded-[10px] border border-ppg-border bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
        >
          {filteredOptions.map((option) => {
            const isSelected = selected?.value === option.value
            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => selectOption(option)}
                  className={`flex w-full px-3 py-3 text-left text-base text-black transition-colors ${
                    isSelected ? 'bg-[#fff4ec]' : 'hover:bg-[#fafafa]'
                  }`}
                >
                  {option.label}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
