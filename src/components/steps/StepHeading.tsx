type StepHeadingProps = {
  step: number
  title: string
  bracket?: string
  titleClassName?: string
}

export function StepHeading({
  step,
  title,
  bracket,
  titleClassName = '',
}: StepHeadingProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black text-base font-semibold text-white"
        aria-hidden
      >
        {step}
      </span>
      <h1
        className={`min-w-0 flex-1 text-[22px] font-bold leading-snug tracking-tight text-black ${titleClassName}`}
      >
        {title}
        {bracket ? <> ({bracket})</> : null}
      </h1>
    </div>
  )
}
