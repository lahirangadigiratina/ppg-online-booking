export type DoorBookingRoute = 'atl' | 'atl-only'

export function doorBookingRouteFromPathname(pathname: string): DoorBookingRoute | null {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  if (normalized === '/atl') return 'atl'
  if (normalized === '/atl-only') return 'atl-only'
  return null
}
