import parcelPointGoLogo from '../../assets/parcelpoint-go-logo.png'

export function ParcelPointLogo() {
  return (
    <div className="-mx-6 bg-white px-5 py-4">
      <img
        src={parcelPointGoLogo}
        alt="PARCELPOINT GO"
        className="mx-auto h-9 w-full max-w-[322px] object-contain object-center"
        width={322}
        height={36}
        decoding="async"
      />
    </div>
  )
}
