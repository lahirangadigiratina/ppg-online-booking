import { Check } from 'lucide-react'

export type DeliveryOptionTag = {
  emoji: string
  label: string
}

type DeliveryOptionCardProps = {
  title: string
  subtitle: string
  price: string
  tags: DeliveryOptionTag[]
  iconSrc: string
  iconAlt: string
  footerAddress?: string
  footerDeliveredByDate?: string
  selected: boolean
  onSelect: () => void
}

export function DeliveryOptionCard({
  title,
  subtitle,
  price,
  tags,
  iconSrc,
  iconAlt,
  footerAddress,
  footerDeliveredByDate,
  selected,
  onSelect,
}: DeliveryOptionCardProps) {
  const showFooter = Boolean(footerAddress || footerDeliveredByDate)

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative w-full rounded-2xl border-2 p-4 text-left transition-colors ${
        selected
          ? 'border-ppg-orange bg-[#fff5f2]'
          : 'border-[#ececec] bg-white hover:border-[#d8d8d8]'
      }`}
    >
      {selected ? (
        <span className="pointer-events-none absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-ppg-orange text-white shadow-sm">
          <Check className="size-3.5" strokeWidth={3} aria-hidden />
        </span>
      ) : null}

      <div className="flex gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#ececec] bg-white p-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
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
          <div
            className={`flex items-start justify-between gap-2 ${selected ? 'pr-7' : ''}`}
          >
            <div className="min-w-0">
              <p className="text-base font-bold leading-snug text-black">{title}</p>
              <p className="mt-0.5 text-sm text-ppg-label">{subtitle}</p>
            </div>
            <p className="shrink-0 text-base font-bold text-black">{price}</p>
          </div>

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag.label}
                className="inline-flex items-center gap-1 rounded-full border border-[#e5e5e5] bg-[#f7f7f7] px-2 py-0.5 text-[11px] font-medium text-[#555]"
              >
                <span aria-hidden>{tag.emoji}</span>
                {tag.label}
              </span>
            ))}
          </div>

          {showFooter ? (
            <div className="mt-3 flex items-end justify-between gap-3 border-t border-[#efefef] pt-3">
              {footerAddress ? (
                <p className="min-w-0 text-xs leading-snug text-ppg-label">
                  {footerAddress}
                </p>
              ) : (
                <span />
              )}
              {footerDeliveredByDate ? (
                <p className="shrink-0 text-right text-xs leading-snug text-ppg-label">
                  Delivered by{' '}
                  <span className="font-bold text-black">
                    {footerDeliveredByDate}
                  </span>
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <span className="sr-only">{iconAlt}</span>
    </button>
  )
}
