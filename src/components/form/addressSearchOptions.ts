export type AddressSearchOption = {
  value: string
  label: string
  subtitle?: string
}

export const ADDRESS_SEARCH_OPTIONS: AddressSearchOption[] = [
  {
    value: '15-37-nicholson-balmain',
    label: '15/37 Nicholson St, Balmain East NSW 2041',
    subtitle: 'Balmain East',
  },
  {
    value: '100-george-sydney',
    label: '100 George St, Sydney NSW 2000',
    subtitle: 'Sydney CBD',
  },
  {
    value: '88-church-parramatta',
    label: '88 Church St, Parramatta NSW 2150',
    subtitle: 'Parramatta',
  },
  {
    value: '12-smith-chatswood',
    label: '12 Smith St, Chatswood NSW 2067',
    subtitle: 'Chatswood',
  },
  {
    value: '45-ocean-bondi',
    label: '45 Ocean Ave, Bondi Beach NSW 2026',
    subtitle: 'Bondi Beach',
  },
  {
    value: '200-collins-melbourne',
    label: '200 Collins St, Melbourne VIC 3000',
    subtitle: 'Melbourne CBD',
  },
]
