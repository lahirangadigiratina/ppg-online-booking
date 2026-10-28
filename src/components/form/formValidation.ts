export function hasRequiredText(value: string): boolean {
  return value.trim().length > 0
}

export function isValidEmail(value: string): boolean {
  const trimmed = value.trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
}

export function hasRequiredParcelValue(value: string): boolean {
  const trimmed = value.trim()
  if (!trimmed) return false
  const amount = Number.parseFloat(trimmed)
  return Number.isFinite(amount) && amount >= 0
}

/** Minimum length for receiver mobile in prototype (any non-trivial entry). */
export function hasRequiredMobileText(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 9
}
