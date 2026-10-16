export const PARCEL_PROTECTION_INCLUDED_VALUE = 100
export const PARCEL_PROTECTION_FEE_PER_BLOCK = 2.5
export const PARCEL_PROTECTION_BLOCK_SIZE = 100

export function parseDeclaredParcelValue(input: string | number): number {
  if (typeof input === 'number') {
    return Number.isFinite(input) ? Math.max(0, input) : 0
  }

  const normalized = input.trim().replace(/,/g, '')
  if (normalized === '') {
    return 0
  }

  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0
}

export function parcelProtectionAdditionalBlocks(declaredValue: number): number {
  if (
    !Number.isFinite(declaredValue) ||
    declaredValue <= PARCEL_PROTECTION_INCLUDED_VALUE
  ) {
    return 0
  }

  return Math.ceil(
    (declaredValue - PARCEL_PROTECTION_INCLUDED_VALUE) /
      PARCEL_PROTECTION_BLOCK_SIZE,
  )
}

/** First $100 included; each additional $100 of cover costs $2.50 (rounded up). */
export function parcelProtectionAddonFee(declaredValue: number): number {
  if (!Number.isFinite(declaredValue) || declaredValue <= PARCEL_PROTECTION_INCLUDED_VALUE) {
    return 0
  }

  return (
    parcelProtectionAdditionalBlocks(declaredValue) *
    PARCEL_PROTECTION_FEE_PER_BLOCK
  )
}

export function isParcelProtectionFullyIncluded(declaredValue: number): boolean {
  return (
    Number.isFinite(declaredValue) &&
    declaredValue >= 0 &&
    declaredValue <= PARCEL_PROTECTION_INCLUDED_VALUE
  )
}

export function formatParcelProtectionAddonPrice(fee: number): string {
  return `+$${fee.toFixed(2)}`
}
