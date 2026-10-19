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
  /** Fits four cards in one row without horizontal scroll */
  compact?: boolean
  className?: string
}

function WeightLine({
  weight,
  compact,
}: {
  weight: string
  compact?: boolean
}) {
  const match = /^Up to (.+)$/i.exec(weight.trim())
  if (!match) {
    return (
      <span
        className={`leading-snug text-ppg-label ${compact ? 'text-[10px]' : 'text-[11px]'}`}
      >
        {weight}
      </span>
    )
  }

  return (
    <p
      className={`leading-snug text-ppg-label ${compact ? 'text-[10px]' : 'text-[11px]'}`}
    >
      Up to{' '}
      <span className="font-bold text-black">{match[1]}</span>
    </p>
  )
}

export function ParcelSizeCard({
  option,
  selected,
  onSelect,
  compact = false,
  className = '',
}: ParcelSizeCardProps) {
  const Icon = option.icon

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative flex min-w-0 flex-col items-center text-center transition-colors ${
        compact
          ? 'rounded-xl px-1 pb-2.5 pt-2.5'
          : 'rounded-[1.25rem] px-2 pb-3.5 pt-3.5'
      } ${
        selected
          ? 'border-2 border-ppg-orange bg-[#fff5f2]'
          : 'border border-[#ececec] bg-white hover:border-[#d8d8d8]'
      } ${className}`}
    >
      {selected ? (
        <span
          className={`absolute -right-0.5 -top-0.5 flex items-center justify-center rounded-full bg-ppg-orange text-white shadow-sm ${
            compact ? 'size-5' : 'size-6'
          }`}
        >
          <Check
            className={compact ? 'size-3' : 'size-3.5'}
            strokeWidth={3}
            aria-hidden
          />
        </span>
      ) : null}

      <span
        className={`flex items-center justify-center rounded-lg border border-[#ececec] bg-white ${
          compact ? 'mb-1.5 size-10 rounded-lg' : 'mb-2.5 size-11 rounded-xl'
        } ${
          selected
            ? 'shadow-[0_4px_14px_rgba(232,92,0,0.22)]'
            : 'shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
        }`}
      >
        <Icon
          className={`${compact ? 'size-5' : 'size-6'} ${selected ? 'text-ppg-orange' : 'text-[#5c5c5c]'}`}
          strokeWidth={1.75}
          aria-hidden
        />
      </span>

      <span
        className={`font-bold leading-tight text-black ${
          compact ? 'text-[11px]' : 'text-[13px]'
        }`}
      >
        {option.label}
      </span>
      <span
        className={`leading-snug text-ppg-label ${
          compact ? 'mt-0.5 text-[9px]' : 'mt-1.5 text-[11px]'
        }`}
      >
        {option.dimensions}
      </span>
      <span className={compact ? 'mt-0' : 'mt-0.5'}>
        <WeightLine weight={option.weight} compact={compact} />
      </span>
    </button>
  )
}
