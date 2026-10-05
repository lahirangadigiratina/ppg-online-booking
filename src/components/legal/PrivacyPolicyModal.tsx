import { LegalDocumentModal } from './LegalDocumentModal'
import { PRIVACY_POLICY_SECTIONS } from './privacyPolicySections'

type PrivacyPolicyModalProps = {
  open: boolean
  onClose: () => void
}

export function PrivacyPolicyModal({ open, onClose }: PrivacyPolicyModalProps) {
  return (
    <LegalDocumentModal
      open={open}
      onClose={onClose}
      documentTitle="Privacy Policy"
      versionLine="(Version 1 – Effective Date 9 July 2026)"
      sections={PRIVACY_POLICY_SECTIONS}
      closeAriaLabel="Back from privacy policy"
    />
  )
}
