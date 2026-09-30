export type ParcelContentOption = {
  value: string
  label: string
  emoji: string
}

export const PARCEL_CONTENT_OPTIONS: ParcelContentOption[] = [
  { value: 'electronics', label: 'Electronics', emoji: '💻' },
  { value: 'clothing-fashion', label: 'Clothing & Fashion', emoji: '👕' },
  { value: 'food-perishables', label: 'Food & Perishables', emoji: '🍎' },
  { value: 'fragile-items', label: 'Fragile Items', emoji: '⚠️' },
  { value: 'sporting-goods', label: 'Sporting Goods', emoji: '⚽' },
  { value: 'books-media', label: 'Books & Media', emoji: '📚' },
  { value: 'health-beauty', label: 'Health & Beauty', emoji: '💊' },
  { value: 'household-items', label: 'Household Items', emoji: '🏠' },
  { value: 'other', label: 'Other', emoji: '📦' },
]

export const DEFAULT_PARCEL_CONTENT_VALUE = 'clothing-fashion'
