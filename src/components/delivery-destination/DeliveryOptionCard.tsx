import { Check } from 'lucide-react'

type DeliveryOptionCardProps = {
  title: string
  description: string
  price: string
  tag: string
  tagClassName: string
  iconSrc: string
  iconAlt: string
  iconContainerClassName?: string
  selected: boolean
  recommended?: boolean
  onSelect: () => void
}

export function DeliveryOptionCard({
  title,
  description,
  price,
  tag,
  tagClassName,
  iconSrc,
  iconAlt,
  iconContainerClassName = 'border-ppg-border',
  selected,
  recommended = false,
  onSelect,
}: DeliveryOptionCardProps) {
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
      {recommended ? (
        <span className="absolute -right-1 -top-2.5 rounded-full bg-black px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
          Recommended
        </span>
      ) : null}

      <div className="flex gap-3">
        <span
          className={`mt-0.5 flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white p-1 ${iconContainerClassName}`}
        >
          <img
            src={iconSrc}
            alt=""
            className="size-full object-contain"
            width={44}
            height={44}
            decoding="async"
            aria-hidden
          />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-base font-semibold leading-snug text-black">{title}</p>
            <p className="shrink-0 text-base font-bold text-black">{price}</p>
          </div>
          <p className="mt-1 text-sm text-ppg-label">{description}</p>
          <span
            className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${tagClassName}`}
          >
            {tag}
          </span>
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
      <span className="sr-only">{iconAlt}</span>
    </button>
  )
}
