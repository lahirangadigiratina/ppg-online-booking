import { Lock, Signal, Wifi } from 'lucide-react'
import { useLayoutEffect, useRef, type ReactNode } from 'react'

/** Minimum white screen area height (px) for all booking steps */
export const PHONE_SCREEN_MIN_HEIGHT_PX = 720

type PhoneFrameProps = {
  children: ReactNode
  /** Lock height (e.g. step 3+) to match steps 1–2 natural size */
  screenHeight?: number
  /** Reports the natural shell height while unlocked */
  onMeasure?: (height: number) => void
  /** Changes scroll position to top when the active step changes */
  contentKey?: string
  /** Disable vertical scroll so step content fits the viewport */
  preventScroll?: boolean
}

export function PhoneFrame({
  children,
  screenHeight,
  onMeasure,
  contentKey,
  preventScroll = false,
}: PhoneFrameProps) {
  const shellRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (screenHeight !== undefined || !onMeasure) return
    const shell = shellRef.current
    if (!shell) return
    onMeasure(
      Math.max(shell.offsetHeight, PHONE_SCREEN_MIN_HEIGHT_PX),
    )
  }, [screenHeight, onMeasure, children])

  useLayoutEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, left: 0 })
  }, [contentKey])

  return (
    <div className="mx-auto flex h-full max-h-full min-h-0 w-full max-w-[430px] flex-col overflow-hidden rounded-2xl border border-[#dcdcdc] bg-white shadow-[0_12px_48px_rgba(0,0,0,0.1)]">
      <div className="shrink-0 bg-white" aria-hidden>
        <div className="flex items-center justify-between px-6 pb-1 pt-2.5 text-[13px] font-semibold tracking-tight text-black">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 text-black">
            <Signal className="size-3.5" strokeWidth={2.5} />
            <Wifi className="size-3.5" strokeWidth={2.5} />
            <span className="relative ml-0.5 inline-block h-2.5 w-[22px] rounded-[3px] border border-black">
              <span className="absolute inset-y-0.5 left-0.5 right-1 rounded-[1px] bg-black" />
            </span>
          </div>
        </div>
        <div className="px-3 pb-1 pt-0.5">
          <div className="flex items-center justify-center gap-2 rounded-xl bg-[#e8e8ed] px-3 py-2.5 text-[13px] text-[#3a3a3c]">
            <Lock className="size-3.5 shrink-0 opacity-70" strokeWidth={2.5} />
            <span className="truncate font-medium">
              book.parcelpointgo.com.au
            </span>
          </div>
        </div>
      </div>

      <div
        ref={shellRef}
        id="phone-screen-root"
        className="relative min-h-0 flex-1 overflow-hidden bg-white"
      >
        <div
          id="phone-screen-scroll"
          ref={scrollRef}
          className={`box-border h-full min-h-0 overflow-x-hidden overscroll-contain px-5 ${
            preventScroll
              ? 'flex flex-col overflow-y-hidden pb-2 pt-0'
              : 'ppg-scroll phone-screen-scroll overflow-y-auto pb-8 pt-0'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
