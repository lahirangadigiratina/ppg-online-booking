import { normalizeAuMobileKey } from '../form/auMobileInput'

export type SavedSenderDetails = {
  businessName?: string
  firstName: string
  lastName: string
  email: string
}

const DEMO_SENDER: SavedSenderDetails = {
  businessName: 'Hubbed',
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane@example.com',
}

/** Known numbers for demo; any other complete AU mobile uses demo sender in prototype. */
const SAVED_SENDERS: Record<string, SavedSenderDetails> = {
  '61412345678': DEMO_SENDER,
  '61434567890': DEMO_SENDER,
}

export function lookupSenderByMobile(
  phone: string,
): SavedSenderDetails | null {
  const key = normalizeAuMobileKey(phone)
  if (!key) {
    return null
  }
  return SAVED_SENDERS[key] ?? DEMO_SENDER
}
