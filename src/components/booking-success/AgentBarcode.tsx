type AgentBarcodeProps = {
  value: string
  className?: string
}

function barcodeBarWidths(value: string): number[] {
  const widths: number[] = [2, 1, 2]
  for (const character of value) {
    widths.push((character.charCodeAt(0) % 3) + 1, 1)
  }
  widths.push(2, 1, 3)
  return widths
}

export function AgentBarcode({ value, className = '' }: AgentBarcodeProps) {
  const barUnit = 3
  const barHeight = 56
  const widths = barcodeBarWidths(value)
  const totalUnits = widths.reduce((sum, width) => sum + width, 0)
  const svgWidth = totalUnits * barUnit

  let x = 0
  const bars = widths.map((width, index) => {
    const rect = {
      x,
      width: width * barUnit,
      fill: index % 2 === 0 ? '#111' : 'transparent',
    }
    x += width * barUnit
    return rect
  })

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${svgWidth} ${barHeight}`}
      role="img"
      aria-label={`Barcode for ${value}`}
      className={`mx-auto block h-20 w-auto max-w-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {bars.map((bar, index) =>
        bar.fill === 'transparent' ? null : (
          <rect
            key={index}
            x={bar.x}
            y={0}
            width={bar.width}
            height={barHeight}
            fill={bar.fill}
          />
        ),
      )}
    </svg>
  )
}
