import { Check, type LucideIcon } from 'lucide-react'

type AddOnOptionCardProps = {
  title: string
  description: string
  price: string
  icon: LucideIcon
  selected: boolean
  onToggle: () => void
}

export function AddOnOptionCard({
  title,
  description,
  price,
  icon: Icon,
  selected,
  onToggle,
}: AddOnOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
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
          <Icon className="size-5 text-black" strokeWidth={1.75} aria-hidden />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-base font-semibold leading-snug text-black">{title}</p>
            <p className="shrink-0 text-base font-bold text-black">{price}</p>
          </div>
          <p className="mt-1 text-sm text-ppg-label">{description}</p>
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
