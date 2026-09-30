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
}

export function PhoneFrame({
  children,
  screenHeight,
  onMeasure,
  contentKey,
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

  const isLocked = screenHeight !== undefined
  const lockedHeight = isLocked
    ? Math.max(screenHeight, PHONE_SCREEN_MIN_HEIGHT_PX)
    : undefined

  return (
    <div className="mx-auto w-full max-w-[390px]">
      <div className="overflow-hidden rounded-[2.75rem] border-[10px] border-black bg-black shadow-[0_24px_48px_rgba(0,0,0,0.18)]">
        <div
          ref={shellRef}
          className="relative bg-white"
          style={lockedHeight !== undefined ? { height: lockedHeight } : undefined}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-0 z-10 h-7 w-[120px] -translate-x-1/2 rounded-b-2xl bg-black"
            aria-hidden
          />
          <div
            ref={scrollRef}
            className={
              isLocked
                ? 'box-border h-full min-h-0 overflow-x-hidden overflow-y-auto px-6 pb-8 pt-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                : 'px-6 pb-8 pt-10'
            }
            style={
              isLocked
                ? undefined
                : { minHeight: PHONE_SCREEN_MIN_HEIGHT_PX }
            }
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
