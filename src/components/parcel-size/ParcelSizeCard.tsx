import { Check, type LucideIcon } from 'lucide-react'

export type ParcelSizeOption = {
  id: string
  label: string
  dimensions: string
  weight: string
  icon: LucideIcon
}

type ParcelSizeCardProps = {
  option: ParcelSizeOption
  selected: boolean
  onSelect: () => void
}

export function ParcelSizeCard({
  option,
  selected,
  onSelect,
}: ParcelSizeCardProps) {
  const Icon = option.icon

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative flex w-full min-w-0 flex-col items-center rounded-xl border px-1.5 pb-2.5 pt-3 text-center transition-colors ${
        selected
          ? 'border-ppg-orange bg-[#fff4ec]'
          : 'border-ppg-border bg-white hover:border-[#d0d0d0]'
      }`}
    >
      {selected ? (
        <span className="absolute right-1.5 top-1.5 flex size-5 items-center justify-center rounded-full bg-ppg-orange text-white">
          <Check className="size-3" strokeWidth={3} aria-hidden />
        </span>
      ) : null}

      <Icon
        className="mb-1.5 size-6 text-[#555]"
        strokeWidth={1.75}
        aria-hidden
      />
      <span className="text-xs font-semibold text-black">{option.label}</span>
      <span className="mt-1 text-[11px] leading-tight text-ppg-label">
        {option.dimensions}
      </span>
      <span className="mt-0.5 text-[11px] leading-tight text-ppg-label">
        {option.weight}
      </span>
    </button>
  )
}
