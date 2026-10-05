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

function WeightLine({ weight }: { weight: string }) {
  const match = /^Up to (.+)$/i.exec(weight.trim())
  if (!match) {
    return (
      <span className="text-[11px] leading-snug text-ppg-label">{weight}</span>
    )
  }

  return (
    <p className="text-[11px] leading-snug text-ppg-label">
      Up to{' '}
      <span className="font-bold text-black">{match[1]}</span>
    </p>
  )
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
      className={`relative flex w-full min-w-0 flex-col items-center rounded-[1.25rem] border-2 px-2 pb-3.5 pt-3.5 text-center transition-colors ${
        selected
          ? 'border-ppg-orange bg-[#fff5f2]'
          : 'border-[#ececec] bg-white hover:border-[#d8d8d8]'
      }`}
    >
      {selected ? (
        <span className="absolute -right-0.5 -top-0.5 flex size-6 items-center justify-center rounded-full bg-ppg-orange text-white shadow-sm">
          <Check className="size-3.5" strokeWidth={3} aria-hidden />
        </span>
      ) : null}

      <span
        className={`mb-2.5 flex size-11 items-center justify-center rounded-xl bg-white ${
          selected
            ? 'shadow-[0_4px_14px_rgba(232,92,0,0.22)]'
            : 'shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
        }`}
      >
        <Icon
          className={`size-6 ${selected ? 'text-ppg-orange' : 'text-[#5c5c5c]'}`}
          strokeWidth={1.75}
          aria-hidden
        />
      </span>

      <span className="text-[13px] font-bold leading-tight text-black">
        {option.label}
      </span>
      <span className="mt-1.5 text-[11px] leading-snug text-ppg-label">
        {option.dimensions}
      </span>
      <span className="mt-0.5">
        <WeightLine weight={option.weight} />
      </span>
    </button>
  )
}
