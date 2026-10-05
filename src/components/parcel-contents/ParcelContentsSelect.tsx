import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import {
  DEFAULT_PARCEL_CONTENT_VALUE,
  PARCEL_CONTENT_OPTIONS,
  type ParcelContentOption,
} from './parcelContentOptions'

type ParcelContentsSelectProps = {
  id?: string
  name?: string
}

export function ParcelContentsSelect({
  id: idProp,
  name = 'parcelContents',
}: ParcelContentsSelectProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const listboxId = `${id}-listbox`
  const containerRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(DEFAULT_PARCEL_CONTENT_VALUE)

  const selected =
    PARCEL_CONTENT_OPTIONS.find((option) => option.value === selectedValue) ??
    PARCEL_CONTENT_OPTIONS[1]

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

  const selectOption = (option: ParcelContentOption) => {
    setSelectedValue(option.value)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        type="hidden"
        name={name}
        value={selected.value}
      />

      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((previous) => !previous)}
        className="flex w-full items-center rounded-[10px] border border-ppg-border bg-white py-3.5 pl-4 pr-10 text-left text-base font-medium text-black outline-none transition-colors focus:border-ppg-orange focus:ring-2 focus:ring-ppg-orange/20"
      >
        <span className="mr-3 text-xl leading-none" aria-hidden>
          {selected.emoji}
        </span>
        <span className="min-w-0 flex-1 truncate">{selected.label}</span>
        <ChevronDown
          className={`pointer-events-none absolute right-3.5 top-1/2 size-5 -translate-y-1/2 text-black transition-transform ${open ? 'rotate-180' : ''}`}
          strokeWidth={2}
          aria-hidden
        />
      </button>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={id}
          className="absolute z-20 mt-1 max-h-[min(320px,50vh)] w-full overflow-y-auto rounded-[10px] border border-ppg-border bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PARCEL_CONTENT_OPTIONS.map((option) => {
            const isSelected = option.value === selectedValue
            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => selectOption(option)}
                  className={`flex w-full items-center gap-3 px-3 py-3 text-left text-base text-black transition-colors ${
                    isSelected ? 'bg-[#fff4ec]' : 'hover:bg-[#fafafa]'
                  }`}
                >
                  <span className="text-xl leading-none" aria-hidden>
                    {option.emoji}
                  </span>
                  <span className="min-w-0 flex-1">{option.label}</span>
                  {isSelected ? (
                    <Check className="size-5 shrink-0 text-black" strokeWidth={2.5} />
                  ) : (
                    <span className="size-5 shrink-0" aria-hidden />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
