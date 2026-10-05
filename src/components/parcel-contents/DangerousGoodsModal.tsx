import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { DANGEROUS_GOODS_ITEMS } from './dangerousGoodsItems'

const PHONE_SCREEN_ROOT_ID = 'phone-screen-root'
const PHONE_SCREEN_SCROLL_ID = 'phone-screen-scroll'

type DangerousGoodsModalProps = {
  open: boolean
  onClose: () => void
}

export function DangerousGoodsModal({ open, onClose }: DangerousGoodsModalProps) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setPortalRoot(document.getElementById(PHONE_SCREEN_ROOT_ID))
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const scrollEl = document.getElementById(PHONE_SCREEN_SCROLL_ID)
    const previousOverflow = scrollEl?.style.overflow ?? ''
    if (scrollEl) {
      scrollEl.scrollTop = 0
      scrollEl.style.overflow = 'hidden'
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (scrollEl) {
        scrollEl.style.overflow = previousOverflow
      }
    }
  }, [open, onClose])

  if (!open || !portalRoot) return null

  return createPortal(
    <div
      className="absolute inset-0 z-[100] flex h-full w-full items-center justify-center overflow-hidden bg-black/45 p-3"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dangerous-goods-title"
        className="flex h-[85%] max-h-[560px] min-h-0 w-full flex-col overflow-hidden rounded-[1.25rem] bg-[#f5f5f5] shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-ppg-border bg-white px-4 py-3">
          <h2
            id="dangerous-goods-title"
            className="text-base font-bold leading-snug text-black"
          >
            Dangerous goods
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#fdeaea] text-[#e53935] transition-colors hover:bg-[#fcd5d5]"
          >
            <X className="size-4" strokeWidth={2.5} aria-hidden />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-3 [scrollbar-width:thin]">
          <div className="flex flex-col gap-2">
            {DANGEROUS_GOODS_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <article
                  key={item.id}
                  className="flex flex-col rounded-xl border border-[#ececec] bg-white p-2.5"
                >
                  <span className="mb-2 flex size-9 items-center justify-center rounded-lg border border-[#ffd4b8] bg-[#fff8f3]">
                    <Icon
                      className="size-[18px] text-ppg-orange"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </span>
                  <h3 className="text-[11px] font-bold leading-snug text-black">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[10px] leading-snug text-ppg-label">
                    {item.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </div>,
    portalRoot,
  )
}
