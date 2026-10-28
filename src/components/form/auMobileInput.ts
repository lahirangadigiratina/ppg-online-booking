export const AU_MOBILE_PREFIX = '+61 4'

export function extractAuMobileLocalDigits(value: string): string {
  let digits = value.replace(/\D/g, '')
  if (digits.startsWith('0')) {
    digits = `61${digits.slice(1)}`
  }
  if (digits.startsWith('61')) {
    digits = digits.slice(2)
  }
  if (digits.startsWith('4')) {
    digits = digits.slice(1)
  }
  return digits.slice(0, 8)
}

export function formatAuMobileDisplay(localDigits: string): string {
  if (localDigits.length === 0) {
    return `${AU_MOBILE_PREFIX} `
  }

  let formatted = `${AU_MOBILE_PREFIX}${localDigits.slice(0, 2)}`
  if (localDigits.length > 2) {
    formatted += ` ${localDigits.slice(2, 5)}`
  }
  if (localDigits.length > 5) {
    formatted += ` ${localDigits.slice(5, 8)}`
  }
  return formatted
}

export function isCompleteAuMobile(value: string): boolean {
  return extractAuMobileLocalDigits(value).length === 8
}

/** International AU mobile key, e.g. 61412345678 */
export function normalizeAuMobileKey(value: string): string | null {
  const localDigits = extractAuMobileLocalDigits(value)
  if (localDigits.length !== 8) {
    return null
  }
  return `614${localDigits}`
}

export function initialAuMobileDisplay(): string {
  return formatAuMobileDisplay('')
}
