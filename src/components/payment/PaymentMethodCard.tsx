import { Check, type LucideIcon } from 'lucide-react'

type PaymentMethodCardProps = {
  title: string
  description: string
  icon: LucideIcon
  iconClassName?: string
  selected: boolean
  onSelect: () => void
}

export function PaymentMethodCard({
  title,
  description,
  icon: Icon,
  iconClassName = 'text-black',
  selected,
  onSelect,
}: PaymentMethodCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative w-full rounded-2xl border p-4 text-left transition-colors ${
        selected
          ? 'border-ppg-orange bg-[#fff4ec]'
          : 'border-ppg-border bg-white hover:border-[#d0d0d0]'
      }`}
    >
      <div className="flex gap-3">
        <span
          className={`mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full border bg-white ${
            selected ? 'border-ppg-orange' : 'border-ppg-border'
          }`}
        >
          <Icon className={`size-5 ${iconClassName}`} strokeWidth={1.75} aria-hidden />
        </span>

        <div className="min-w-0 flex-1 pr-2">
          <p className="text-base font-semibold leading-snug text-black">{title}</p>
          <p className="mt-1 text-sm leading-snug text-ppg-label">{description}</p>
        </div>

        <span
          className={`mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${
            selected
              ? 'border-ppg-orange bg-ppg-orange text-white'
              : 'border-[#d8d8d8] bg-white'
          }`}
          aria-hidden
        >
          {selected ? <Check className="size-3.5" strokeWidth={3} /> : null}
        </span>
      </div>
    </button>
  )
}
