import parcelPointGoLogo from '../../assets/parcelpoint-go-logo.png'

type ParcelPointLogoProps = {
  compact?: boolean
}

export function ParcelPointLogo({ compact = false }: ParcelPointLogoProps) {
  return (
    <div
      className={`shrink-0 bg-white ${compact ? '-mx-5 px-3 py-2' : '-mx-6 px-5 py-4'}`}
    >
      <img
        src={parcelPointGoLogo}
        alt="PARCELPOINT GO"
        className={`mx-auto w-full max-w-[322px] object-contain object-center ${
          compact ? 'h-7' : 'h-9'
        }`}
        width={322}
        height={36}
        decoding="async"
      />
    </div>
  )
}
