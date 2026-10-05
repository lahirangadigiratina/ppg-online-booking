import { TERMS_SECTIONS } from './termsAndConditionsSections'
import { LegalDocumentModal } from './LegalDocumentModal'

type TermsAndConditionsModalProps = {
  open: boolean
  onClose: () => void
}

export function TermsAndConditionsModal({
  open,
  onClose,
}: TermsAndConditionsModalProps) {
  return (
    <LegalDocumentModal
      open={open}
      onClose={onClose}
      documentTitle="Terms and Conditions"
      versionLine="(Version 1 – Effective Date 9 July 2026)"
      sections={TERMS_SECTIONS}
      closeAriaLabel="Back from terms and conditions"
    />
  )
}
