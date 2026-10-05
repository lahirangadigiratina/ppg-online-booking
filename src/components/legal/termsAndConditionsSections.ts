import type { LegalDocumentSection } from './legalDocumentSection'

export type TermsSection = LegalDocumentSection

export const TERMS_SECTIONS: LegalDocumentSection[] = [
  {
    id: 'agreement',
    number: 1,
    title: 'Agreement',
    bullets: [
      'These Terms apply to bookings made on or after the Effective Date and govern your access to and use of the PARCELPOINT Go platform, website, mobile experiences and related services.',
      'By completing a booking, you agree to these terms on behalf of yourself and, where applicable, the recipient.',
      'We may update these terms from time to time. The version and effective date shown at the top of this document apply to your booking.',
    ],
  },
  {
    id: 'eligibility',
    number: 2,
    title: 'Eligibility, Accounts and Verification',
    bullets: [
      'You must be at least 18 years old and authorised to send the parcel on behalf of the sender.',
      'Mobile verification may be required before you can complete a booking.',
      'You are responsible for keeping your contact details accurate and up to date.',
    ],
  },
  {
    id: 'our-services',
    number: 3,
    title: 'Our Services',
    bullets: [
      'PARCELPOINT Go facilitates parcel drop-off, labelling and handover to our delivery partners.',
      'Service availability, carriers and delivery options may vary by location and parcel characteristics.',
      'Estimated delivery times are indicative only and are not guaranteed unless expressly stated.',
    ],
  },
  {
    id: 'shipping',
    number: 4,
    title: 'Shipping',
    bullets: [
      'You must provide accurate sender, recipient and delivery information.',
      'Parcels must be dropped off at the selected PARCELPOINT location within the stated timeframe.',
      'We are not responsible for delays caused by incorrect addresses or incomplete details.',
    ],
  },
  {
    id: 'parcel-size',
    number: 5,
    title: 'Parcel Size, Weight and Pricing',
    bullets: [
      'You must select the size category that best fits your parcel. Oversized or overweight items may incur additional charges or be refused.',
      'Pricing includes applicable fees shown at checkout, including optional add-ons you select.',
      'Declared parcel value may affect protection options and claim limits.',
    ],
  },
  {
    id: 'prohibited-goods',
    number: 6,
    title: 'Prohibited, Dangerous and Restricted Goods',
    bullets: [
      'You must not send prohibited, illegal, dangerous or restricted goods.',
      'Refer to the dangerous goods guide in the booking flow for examples of items that cannot be sent.',
      'We may inspect, refuse or dispose of non-compliant parcels in accordance with law and carrier rules.',
    ],
  },
  {
    id: 'sender-obligations',
    number: 7,
    title: 'Sender Obligations and Packaging',
    bullets: [
      'Parcels must be securely packaged to withstand normal handling during transport.',
      'Optional in-store packaging may be available for an additional fee where offered.',
      'You are responsible for compliance with all applicable laws and carrier requirements.',
    ],
  },
  {
    id: 'collection-services',
    number: 8,
    title: 'Collection Services',
    bullets: [
      'Where collection from a PARCELPOINT location is selected, the recipient must collect within the retention period displayed.',
      'Proof of identity may be required when collecting a parcel.',
      'Uncollected parcels may be returned or disposed of in accordance with our policies.',
    ],
  },
  {
    id: 'charges-payment',
    number: 9,
    title: 'Charges and Payment',
    bullets: [
      'Payment is due at booking unless you select pay-in-store where available.',
      'All amounts are shown in Australian dollars and include GST where applicable.',
      'Refunds and adjustments are handled in accordance with our refunds policy and carrier rules.',
    ],
  },
]
