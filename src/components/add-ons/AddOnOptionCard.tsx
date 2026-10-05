import { Check, type LucideIcon } from 'lucide-react'

type AddOnOptionCardProps = {
  title: string
  description: string
  price: string
  icon: LucideIcon
  selected: boolean
  onToggle: () => void
  linkLabel?: string
  onLinkClick?: () => void
}

export function AddOnOptionCard({
  title,
  description,
  price,
  icon: Icon,
  selected,
  onToggle,
  linkLabel,
  onLinkClick,
}: AddOnOptionCardProps) {
  return (
    <div className="w-full rounded-2xl border border-ppg-border bg-white p-4 text-left transition-colors hover:border-[#d0d0d0]">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={selected}
          className="flex min-w-0 flex-1 items-start gap-3 text-left"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f3f3f3]">
            <Icon className="size-5 text-black" strokeWidth={1.75} aria-hidden />
          </span>

          <span className="min-w-0 flex-1">
            <span className="flex items-start justify-between gap-3">
              <span className="text-base font-bold leading-snug text-black">
                {title}
              </span>
              <span className="shrink-0 text-base font-bold text-black">
                {price}
              </span>
            </span>
            <span className="mt-1 block text-sm leading-snug text-ppg-label">
              {description}
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={onToggle}
          aria-label={selected ? `Deselect ${title}` : `Select ${title}`}
          className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${
            selected
              ? 'bg-ppg-orange text-white'
              : 'border-2 border-[#d8d8d8] bg-white'
          }`}
        >
          {selected ? (
            <Check className="size-3.5" strokeWidth={3} aria-hidden />
          ) : null}
        </button>
      </div>

      {linkLabel ? (
        <button
          type="button"
          className="mt-1.5 pl-14 text-sm font-medium text-ppg-orange underline underline-offset-2"
          onClick={() => onLinkClick?.()}
        >
          {linkLabel}
        </button>
      ) : null}
    </div>
  )
}
