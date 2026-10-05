import type { CollectRadiusOption } from './CollectRadiusSelect'

export type CollectStore = {
  id: string
  name: string
  distanceKm: number
  address: string
  hours: string
  open: boolean
}

export const COLLECT_STORES: CollectStore[] = [
  {
    id: 'queens-rd-pharmacy',
    name: 'Queens Rd Pharmacy Lockers',
    distanceKm: 0.9,
    address: '88 Queens Rd, Bondi Junction NSW 2022',
    hours: 'Mon 8am – 8pm',
    open: true,
  },
  {
    id: 'bondi-junction-newsagent',
    name: 'Bondi Junction Newsagent',
    distanceKm: 1.2,
    address: '5 Bronte Rd, Bondi Junction NSW 2022',
    hours: 'Mon 6am – 8pm',
    open: true,
  },
  {
    id: 'westfield-parcel-locker',
    name: 'Westfield Parcel Locker',
    distanceKm: 1.3,
    address: '500 Oxford St, Bondi Junction NSW 2022',
    hours: 'Mon 24 hours',
    open: true,
  },
  {
    id: 'bronte-rd-express',
    name: 'Bronte Rd Express',
    distanceKm: 1.4,
    address: '15 Bronte Rd, Bondi Junction NSW 2022',
    hours: 'Mon 7am – 7pm',
    open: true,
  },
  {
    id: 'holmes-st-hub',
    name: 'Holmes St Hub',
    distanceKm: 1.5,
    address: '2 Holmes St, Bondi Junction NSW 2022',
    hours: 'Mon 8am – 6pm',
    open: true,
  },
  {
    id: 'spring-st-news',
    name: 'Spring St News & Collect',
    distanceKm: 1.6,
    address: '25 Spring St, Bondi Junction NSW 2022',
    hours: 'Mon 6am – 10pm',
    open: true,
  },
  {
    id: 'centennial-cellars',
    name: 'Centennial Cellars',
    distanceKm: 1.7,
    address: '412 Oxford St, Bondi Junction NSW 2022',
    hours: 'Mon 9am – 9pm',
    open: true,
  },
  {
    id: 'oxford-st-lotto',
    name: 'Oxford St Lotto & ParcelPoint',
    distanceKm: 1.8,
    address: '120 Oxford St, Bondi Junction NSW 2022',
    hours: 'Mon 7am – 9pm',
    open: true,
  },
  {
    id: 'mall-level-2',
    name: 'Westfield Level 2 Desk',
    distanceKm: 1.9,
    address: '500 Oxford St, Bondi Junction NSW 2022',
    hours: 'Mon 9am – 5:30pm',
    open: true,
  },
  {
    id: 'pennant-ave',
    name: 'Pennant Ave ParcelPoint',
    distanceKm: 1.95,
    address: '44 Pennant Ave, Bondi Junction NSW 2022',
    hours: 'Mon 8am – 7pm',
    open: true,
  },
  {
    id: 'sydney-rd-collect',
    name: 'Sydney Rd Collect',
    distanceKm: 2.0,
    address: '9 Sydney Rd, Bondi Junction NSW 2022',
    hours: 'Mon 7:30am – 8:30pm',
    open: true,
  },
  {
    id: 'edgecliff-hub',
    name: 'Edgecliff Station Hub',
    distanceKm: 2.8,
    address: 'Edgecliff Rd, Edgecliff NSW 2027',
    hours: 'Mon 6am – 11pm',
    open: true,
  },
]

export function filterCollectStores(
  stores: CollectStore[],
  query: string,
  radius: CollectRadiusOption,
): CollectStore[] {
  const maxKm = Number.parseInt(radius, 10)
  const normalized = query.trim().toLowerCase()

  return stores.filter((store) => {
    if (store.distanceKm > maxKm) return false
    if (!normalized) return true
    return (
      store.name.toLowerCase().includes(normalized) ||
      store.address.toLowerCase().includes(normalized)
    )
  })
}
