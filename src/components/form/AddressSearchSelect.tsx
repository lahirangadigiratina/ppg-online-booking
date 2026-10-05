import { Search } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import {
  ADDRESS_SEARCH_OPTIONS,
  type AddressSearchOption,
} from './addressSearchOptions'

type AddressSearchSelectProps = {
  id?: string
  name?: string
  placeholder?: string
}

export function AddressSearchSelect({
  id: idProp,
  name = 'receiverAddress',
  placeholder = 'Search for an address',
}: AddressSearchSelectProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const listboxId = `${id}-listbox`
  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<AddressSearchOption | null>(null)

  const displayValue = selected?.label ?? query

  const filteredOptions = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return ADDRESS_SEARCH_OPTIONS
    return ADDRESS_SEARCH_OPTIONS.filter(
      (option) =>
        option.label.toLowerCase().includes(normalized) ||
        option.subtitle?.toLowerCase().includes(normalized),
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

  const selectOption = (option: AddressSearchOption) => {
    setSelected(option)
    setQuery('')
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        type="hidden"
        name={name}
        value={selected?.value ?? ''}
        readOnly
        aria-hidden
      />

      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-ppg-label"
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
        placeholder={placeholder}
        value={displayValue}
        onChange={(event) => {
          setQuery(event.target.value)
          setSelected(null)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        className="w-full rounded-[10px] border border-ppg-border bg-white py-3.5 pl-11 pr-4 text-base text-black outline-none transition-colors placeholder:text-[#b8b8b8] focus:border-ppg-orange focus:ring-2 focus:ring-ppg-orange/20"
      />

      {open && filteredOptions.length > 0 ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={id}
          className="absolute z-20 mt-1 max-h-[min(280px,45vh)] w-full overflow-y-auto rounded-[10px] border border-ppg-border bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                  className={`flex w-full flex-col items-start gap-0.5 px-3 py-3 text-left transition-colors ${
                    isSelected ? 'bg-[#fff4ec]' : 'hover:bg-[#fafafa]'
                  }`}
                >
                  <span className="text-base text-black">{option.label}</span>
                  {option.subtitle ? (
                    <span className="text-xs text-ppg-label">
                      {option.subtitle}
                    </span>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}

      {open && query.trim() && filteredOptions.length === 0 ? (
        <p className="absolute z-20 mt-1 w-full rounded-[10px] border border-ppg-border bg-white px-3 py-3 text-sm text-ppg-label shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
          No addresses found. Try another search.
        </p>
      ) : null}
    </div>
  )
}
