type StepHeadingProps = {
  step: number
  title: string
  bracket?: string
  titleClassName?: string
  compact?: boolean
}

export function StepHeading({
  step,
  title,
  bracket,
  titleClassName = '',
  compact = false,
}: StepHeadingProps) {
  return (
    <div className={`flex items-center ${compact ? 'gap-2' : 'gap-3'}`}>
      <span
        className={`flex shrink-0 items-center justify-center rounded-full bg-black font-semibold text-white ${
          compact ? 'size-7 text-sm' : 'size-9 text-base'
        }`}
        aria-hidden
      >
        {step}
      </span>
      <h1
        className={`min-w-0 flex-1 font-bold leading-snug tracking-tight text-black ${
          compact ? 'text-lg' : 'text-[22px]'
        } ${titleClassName}`}
      >
        {title}
        {bracket ? <> ({bracket})</> : null}
      </h1>
    </div>
  )
}
