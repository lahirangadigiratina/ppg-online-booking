import { CircleCheck } from 'lucide-react'
import { useId, useState } from 'react'
import { FormField } from './FormField'

type VerifiedMobileFieldProps = {
  onVerifiedChange?: (verified: boolean, phone: string) => void
}

type Step = 'phone' | 'otp' | 'verified'

const AU_MOBILE_PREFIX = '+61 4'

function normalizePhone(value: string): string {
  return value.replace(/\s/g, '')
}

/** Digits after +61 4 (8 digits for a complete AU mobile). */
function extractAuMobileLocalDigits(value: string): string {
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

function formatAuMobileDisplay(localDigits: string): string {
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

function isCompleteAuMobile(value: string): boolean {
  return extractAuMobileLocalDigits(value).length === 8
}

function initialAuMobileDisplay(): string {
  return formatAuMobileDisplay('')
}

export function VerifiedMobileField({
  onVerifiedChange,
}: VerifiedMobileFieldProps) {
  const phoneInputId = useId()
  const otpInputId = useId()
  const [step, setStep] = useState<Step>('phone')
  const [phone, setPhone] = useState(initialAuMobileDisplay)
  const [otp, setOtp] = useState('')
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [otpError, setOtpError] = useState<string | null>(null)

  function notifyVerified(verified: boolean, nextPhone: string) {
    onVerifiedChange?.(verified, nextPhone)
  }

  function handleSendCode() {
    const trimmed = phone.trim()
    if (!isCompleteAuMobile(trimmed)) {
      setPhoneError('Enter a valid Australian mobile number.')
      return
    }
    setPhoneError(null)
    setOtp('')
    setOtpError(null)
    setStep('otp')
    notifyVerified(false, trimmed)
  }

  function handleVerifyOtp() {
    const code = otp.replace(/\s/g, '')
    if (code.length < 4) {
      setOtpError('Enter the code from your SMS.')
      return
    }
    setOtpError(null)
    setStep('verified')
    notifyVerified(true, phone.trim())
  }

  function handleChangeNumber() {
    setStep('phone')
    setOtp('')
    setOtpError(null)
    if (!isCompleteAuMobile(phone)) {
      setPhone(initialAuMobileDisplay())
    }
    notifyVerified(false, phone.trim())
  }

  if (step === 'verified') {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-black">Mobile number</span>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="text-base font-semibold tracking-tight text-black">
            {phone.trim()}
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-ppg-verified">
            <CircleCheck className="size-4 shrink-0" strokeWidth={2.25} aria-hidden />
            Verified
          </span>
        </div>
        <button
          type="button"
          onClick={handleChangeNumber}
          className="mt-0.5 w-fit text-xs font-medium text-ppg-orange transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ppg-orange"
        >
          Change number
        </button>
        <input type="hidden" name="mobile" value={normalizePhone(phone)} />
      </div>
    )
  }

  if (step === 'otp') {
    return (
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-black">Verification code</span>
          <p className="text-[11px] leading-snug text-ppg-label">
            Enter the code we sent to{' '}
            <span className="font-medium text-black">{phone.trim()}</span>
          </p>
        </div>

        <FormField label="SMS code" htmlFor={otpInputId}>
          <div className="flex min-w-0 items-stretch overflow-hidden rounded-[10px] border border-ppg-border bg-white focus-within:border-ppg-orange focus-within:ring-2 focus-within:ring-ppg-orange/20">
            <input
              id={otpInputId}
              name="mobileOtp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="Enter code"
              value={otp}
              maxLength={6}
              onChange={(event) => {
                setOtp(event.target.value.replace(/\D/g, ''))
                setOtpError(null)
              }}
              className="min-w-0 flex-1 border-0 bg-transparent px-4 py-2.5 text-sm text-black outline-none placeholder:text-[#b8b8b8] focus:ring-0"
            />
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="shrink-0 border-l border-ppg-border bg-ppg-orange px-4 text-sm font-bold text-white transition-colors hover:bg-ppg-orange-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ppg-orange"
            >
              Verify
            </button>
          </div>
        </FormField>

        {otpError ? (
          <p className="text-xs text-red-600" role="alert">
            {otpError}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <button
            type="button"
            onClick={handleSendCode}
            className="text-xs font-medium text-ppg-orange transition-opacity hover:opacity-80"
          >
            Resend code
          </button>
          <button
            type="button"
            onClick={handleChangeNumber}
            className="text-xs font-medium text-ppg-label underline-offset-2 hover:underline"
          >
            Change number
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <FormField
        label={
          <>
            Mobile number <span className="text-red-500">*</span>
          </>
        }
        htmlFor={phoneInputId}
      >
        <div className="flex min-w-0 items-stretch overflow-hidden rounded-[10px] border border-ppg-border bg-white focus-within:border-ppg-orange focus-within:ring-2 focus-within:ring-ppg-orange/20">
          <input
            id={phoneInputId}
            name="mobile"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => {
              setPhone(
                formatAuMobileDisplay(
                  extractAuMobileLocalDigits(event.target.value),
                ),
              )
              setPhoneError(null)
            }}
            onFocus={(event) => {
              const len = event.currentTarget.value.length
              requestAnimationFrame(() => {
                event.currentTarget.setSelectionRange(len, len)
              })
            }}
            className="min-w-0 flex-1 border-0 bg-transparent px-4 py-2.5 text-sm text-black outline-none placeholder:text-[#b8b8b8] focus:ring-0"
          />
          <button
            type="button"
            onClick={handleSendCode}
            className="shrink-0 border-l border-ppg-border px-4 text-sm font-bold text-ppg-orange transition-colors hover:bg-[#fff5f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ppg-orange"
          >
            Send code
          </button>
        </div>
      </FormField>

      {phoneError ? (
        <p className="text-xs text-red-600" role="alert">
          {phoneError}
        </p>
      ) : null}
    </div>
  )
}
