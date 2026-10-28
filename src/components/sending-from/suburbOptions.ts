export type SuburbOption = {
  value: string
  label: string
  /** Matched against store address lines in demo data */
  addressPart: string
}

export const SUBURB_OPTIONS: SuburbOption[] = [
  { value: 'bondi-junction', label: 'Bondi Junction', addressPart: 'Bondi Junction' },
  { value: 'edgecliff', label: 'Edgecliff', addressPart: 'Edgecliff' },
]
