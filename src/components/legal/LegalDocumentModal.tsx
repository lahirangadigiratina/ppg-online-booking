import { ChevronLeft } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ParcelPointLogo } from '../branding/ParcelPointLogo'
import type { LegalDocumentSection } from './legalDocumentSection'

const PHONE_SCREEN_ROOT_ID = 'phone-screen-root'
const PHONE_SCREEN_SCROLL_ID = 'phone-screen-scroll'

type LegalDocumentModalProps = {
  open: boolean
  onClose: () => void
  documentTitle: string
  versionLine: string
  sections: LegalDocumentSection[]
  closeAriaLabel: string
}

export function LegalDocumentModal({
  open,
  onClose,
  documentTitle,
  versionLine,
  sections,
  closeAriaLabel,
}: LegalDocumentModalProps) {
  const titleId = useId()
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setPortalRoot(document.getElementById(PHONE_SCREEN_ROOT_ID))
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      }
    }

    const scrollEl = document.getElementById(PHONE_SCREEN_SCROLL_ID)
    const previousOverflow = scrollEl?.style.overflow ?? ''
    if (scrollEl) {
      scrollEl.style.overflow = 'hidden'
    }

    document.addEventListener('keydown', handleKeyDown, true)
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
      if (scrollEl) {
        scrollEl.style.overflow = previousOverflow
      }
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    contentRef.current?.scrollTo({ top: 0 })
  }, [open, sections])

  if (!open || !portalRoot) return null

  return createPortal(
    <div
      className="absolute inset-0 z-[110] flex min-h-0 flex-col overflow-hidden bg-[#f3f3f3]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        ref={contentRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-8 pt-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ParcelPointLogo />

        <button
          type="button"
          onClick={onClose}
          aria-label={closeAriaLabel}
          className="mt-4 inline-flex items-center gap-0.5 text-base font-semibold text-ppg-orange transition-opacity hover:opacity-80"
        >
          <ChevronLeft className="size-5 shrink-0" strokeWidth={2.25} aria-hidden />
          Back
        </button>

        <div className="mt-4 rounded-[1.25rem] bg-[#ececec] px-4 py-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#1a1a1a]">
            PARCELPOINT Go
          </p>
          <h2
            id={titleId}
            className="mt-2 text-xl font-extrabold uppercase leading-tight tracking-wide text-ppg-orange"
          >
            {documentTitle}
          </h2>
          <p className="mt-2 text-xs text-[#777]">{versionLine}</p>
        </div>

        <article className="mt-4 rounded-2xl border border-ppg-border bg-white p-4">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <section key={section.id}>
                {index > 0 ? (
                  <hr className="mb-8 border-0 border-t border-ppg-border" />
                ) : null}
                <div className="mb-3 flex items-start gap-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ppg-orange text-sm font-bold text-white">
                    {section.number}
                  </span>
                  <h3 className="pt-1 text-base font-bold leading-snug text-black">
                    {section.title}
                  </h3>
                </div>
                {section.bullets ? (
                  <ul className="space-y-3">
                    {section.bullets.map((item) => (
                      <li
                        key={item}
                        className="relative pl-5 text-sm leading-relaxed text-[#444] before:absolute before:left-0 before:top-[0.55em] before:size-2 before:rounded-full before:bg-ppg-orange before:content-['']"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>,
    portalRoot,
  )
}
