import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'

export const COLLECT_RADIUS_OPTIONS = ['2 km', '5 km', '10 km'] as const
export type CollectRadiusOption = (typeof COLLECT_RADIUS_OPTIONS)[number]

type CollectRadiusSelectProps = {
  id?: string
  value: CollectRadiusOption
  onChange: (value: CollectRadiusOption) => void
  compact?: boolean
}

export function CollectRadiusSelect({
  id: idProp,
  value,
  onChange,
  compact = false,
}: CollectRadiusSelectProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const listboxId = `${id}-listbox`
  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

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

  return (
    <div
      ref={containerRef}
      className={`relative ${compact ? 'w-[92px] shrink-0' : 'w-full'}`}
    >
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((previous) => !previous)}
        className={`flex w-full items-center justify-between rounded-full border border-ppg-border bg-white text-left font-semibold text-black outline-none transition-colors focus:border-ppg-orange focus:ring-2 focus:ring-ppg-orange/20 ${
          compact
            ? 'gap-1 px-3 py-3 text-sm shadow-none'
            : 'px-5 py-3.5 text-base shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
        }`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={`size-4 shrink-0 text-black transition-transform sm:size-5 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2}
          aria-hidden
        />
      </button>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={id}
          className="absolute z-[110] mt-2 w-full min-w-[92px] overflow-hidden rounded-2xl border border-ppg-border bg-white py-1 shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
        >
          {COLLECT_RADIUS_OPTIONS.map((option) => {
            const isSelected = option === value
            return (
              <li key={option} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between px-5 py-3.5 text-left text-base font-semibold text-black transition-colors ${
                    isSelected ? 'bg-[#fff5f2]' : 'hover:bg-[#fafafa]'
                  }`}
                >
                  <span>{option}</span>
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
