import type { LegalDocumentSection } from './legalDocumentSection'

export const PRIVACY_POLICY_SECTIONS: LegalDocumentSection[] = [
  {
    id: 'introduction',
    number: 1,
    title: 'Introduction',
    bullets: [
      'This Privacy Policy explains how PARCELPOINT Go collects, uses and protects personal information when you use our online booking service.',
      'We are committed to handling personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.',
      'By using our service, you acknowledge that you have read this policy.',
    ],
  },
  {
    id: 'information-collected',
    number: 2,
    title: 'Information We Collect',
    bullets: [
      'Contact details such as name, email address and mobile number for senders and recipients.',
      'Booking and shipment details including addresses, parcel contents, declared value and delivery preferences.',
      'Payment-related information processed by our payment partners (we do not store full card details on our servers).',
      'Technical data such as device type, browser and approximate location when you use our website.',
    ],
  },
  {
    id: 'how-we-use',
    number: 3,
    title: 'How We Use Your Information',
    bullets: [
      'To create and manage your booking, generate labels and facilitate delivery through our carrier partners.',
      'To send booking confirmations, tracking updates and service-related notifications.',
      'To verify your identity where required, including SMS verification of mobile numbers.',
      'To improve our services, prevent fraud and comply with legal obligations.',
    ],
  },
  {
    id: 'sharing',
    number: 4,
    title: 'Sharing and Disclosure',
    bullets: [
      'We share information with delivery carriers, PARCELPOINT store partners and payment providers as needed to fulfil your booking.',
      'We may disclose information where required by law, court order or to protect the rights and safety of our users.',
      'We do not sell your personal information to third parties for their marketing purposes.',
    ],
  },
  {
    id: 'retention',
    number: 5,
    title: 'Data Retention',
    bullets: [
      'We retain booking records for as long as needed to provide the service, resolve disputes and meet legal and accounting requirements.',
      'When information is no longer required, we take reasonable steps to destroy or de-identify it.',
    ],
  },
  {
    id: 'your-rights',
    number: 6,
    title: 'Your Rights',
    bullets: [
      'You may request access to or correction of personal information we hold about you.',
      'You may opt out of non-essential marketing communications at any time.',
      'To make a privacy request, contact us using the details in the Contact section below.',
    ],
  },
  {
    id: 'cookies',
    number: 7,
    title: 'Cookies and Analytics',
    bullets: [
      'We use cookies and similar technologies to keep you signed in, remember preferences and understand how our site is used.',
      'You can control cookies through your browser settings; disabling cookies may affect some features of the booking flow.',
    ],
  },
  {
    id: 'contact',
    number: 8,
    title: 'Contact Us',
    bullets: [
      'For privacy enquiries or complaints, contact our Privacy Officer at privacy@parcelpointgo.com.au.',
      'If you are not satisfied with our response, you may contact the Office of the Australian Information Commissioner (OAIC).',
    ],
  },
]
