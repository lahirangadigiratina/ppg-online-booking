import type { SVGProps } from 'react'

type BreadBagIconProps = SVGProps<SVGSVGElement> & {
  strokeWidth?: number
}

export function BreadBagIcon({
  className,
  strokeWidth = 1.75,
  ...props
}: BreadBagIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 4v1.75" />
      <path d="M10.25 5.25 12 4l1.75 1.25" />
      <path d="M8.75 8h6.5" />
      <path d="M8 8.75v11.5a1.25 1.25 0 0 0 1.25 1.25h5.5a1.25 1.25 0 0 0 1.25-1.25V8.75a1.25 1.25 0 0 0-1.25-1.25h-5.5A1.25 1.25 0 0 0 8 8.75z" />
      <path d="M8 11.75h8" />
      <path d="M8 14.75h8" />
    </svg>
  )
}
