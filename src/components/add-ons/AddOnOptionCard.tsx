import { Check, type LucideIcon } from 'lucide-react'

type AddOnOptionCardProps = {
  title: string
  description: string
  price: string
  icon: LucideIcon
  selected?: boolean
  onToggle?: () => void
  selectable?: boolean
  included?: boolean
  linkLabel?: string
  onLinkClick?: () => void
}

export function AddOnOptionCard({
  title,
  description,
  price,
  icon: Icon,
  selected = false,
  onToggle,
  selectable = true,
  included = false,
  linkLabel,
  onLinkClick,
}: AddOnOptionCardProps) {
  const cardClassName = included
    ? 'w-full rounded-2xl border-2 border-ppg-orange bg-[#fff5f2] p-4 text-left'
    : 'w-full rounded-2xl border border-ppg-border bg-white p-4 text-left transition-colors hover:border-[#d0d0d0]'

  if (included) {
    return (
      <div className={cardClassName}>
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f3f3f3]">
            <Icon className="size-5 text-black" strokeWidth={1.75} aria-hidden />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <p className="text-base font-bold leading-snug text-black">
                {title}
              </p>
              <p className="shrink-0 text-base font-bold text-ppg-orange">
                {price}
              </p>
            </div>
            <p className="mt-1 text-sm leading-snug text-ppg-label">
              {description}
            </p>
            {linkLabel ? (
              <button
                type="button"
                className="mt-1.5 text-sm font-medium text-ppg-orange underline underline-offset-2"
                onClick={() => onLinkClick?.()}
              >
                {linkLabel}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  const body = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f3f3f3]">
        <Icon className="size-5 text-black" strokeWidth={1.75} aria-hidden />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-3">
          <span className="text-base font-bold leading-snug text-black">
            {title}
          </span>
          <span className="shrink-0 text-base font-bold text-black">{price}</span>
        </span>
        <span className="mt-1 block text-sm leading-snug text-ppg-label">
          {description}
        </span>
      </span>
    </>
  )

  return (
    <div className={cardClassName}>
      <div className="flex items-start gap-3">
        {selectable ? (
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={selected}
            className="flex min-w-0 flex-1 items-start gap-3 text-left"
          >
            {body}
          </button>
        ) : (
          <div className="flex min-w-0 flex-1 items-start gap-3">{body}</div>
        )}

        {selectable ? (
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
        ) : null}
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
