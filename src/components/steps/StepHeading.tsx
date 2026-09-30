type StepHeadingProps = {
  step: number
  title: string
  titleClassName?: string
}

export function StepHeading({
  step,
  title,
  titleClassName = '',
}: StepHeadingProps) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-black text-base font-semibold text-white"
        aria-hidden
      >
        {step}
      </span>
      <h1
        className={`min-w-0 flex-1 text-[22px] font-bold leading-snug tracking-tight text-black ${titleClassName}`}
      >
        {title}
      </h1>
    </div>
  )
}
