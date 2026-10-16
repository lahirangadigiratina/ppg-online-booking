import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, type ReactNode } from 'react'

const SCROLL_STEP_PX = 116

type ParcelSizeCarouselProps = {
  children: ReactNode
}

function CarouselNavButton({
  direction,
  onClick,
}: {
  direction: 'left' | 'right'
  onClick: () => void
}) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight

  return (
    <button
      type="button"
      aria-label={
        direction === 'left'
          ? 'Scroll parcel sizes left'
          : 'Scroll parcel sizes right'
      }
      onClick={onClick}
      className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#ececec] bg-white text-ppg-orange shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-colors hover:border-[#d8d8d8]"
    >
      <Icon className="size-5" strokeWidth={2.25} aria-hidden />
    </button>
  )
}

export function ParcelSizeCarousel({ children }: ParcelSizeCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scroll(direction: 'left' | 'right') {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -SCROLL_STEP_PX : SCROLL_STEP_PX,
      behavior: 'smooth',
    })
  }

  return (
    <div className="flex items-center gap-2">
      <CarouselNavButton direction="left" onClick={() => scroll('left')} />
      <div
        ref={scrollRef}
        className="flex min-w-0 flex-1 snap-x snap-mandatory gap-2.5 overflow-x-auto pb-1 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <CarouselNavButton direction="right" onClick={() => scroll('right')} />
    </div>
  )
}
