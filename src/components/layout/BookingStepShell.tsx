import type { FormEventHandler, ReactNode } from 'react'
import { ParcelPointLogo } from '../branding/ParcelPointLogo'
import {
  BOOKING_BODY_CLASS,
  BOOKING_FOOTER_CLASS,
  BOOKING_FORM_CLASS,
  BOOKING_HR_CLASS,
  BOOKING_SCROLL_BODY_CLASS,
  BOOKING_SHELL_CLASS,
} from './bookingStepStyles'

type BookingStepShellProps = {
  children: ReactNode
  footer?: ReactNode
  /** Remount footer when this changes (e.g. dynamic primary button label) */
  footerKey?: string | number | null
  onSubmit?: FormEventHandler<HTMLFormElement>
  /** Middle content scrolls inside the phone when taller than the viewport */
  scrollableBody?: boolean
  /** Extra class on the scrollable step body (e.g. step-specific sticky headers) */
  bodyClassName?: string
}

function StepBody({
  scrollableBody,
  bodyClassName,
  children,
}: {
  scrollableBody: boolean
  bodyClassName?: string
  children: ReactNode
}) {
  if (scrollableBody) {
    return (
      <div className={`${BOOKING_SCROLL_BODY_CLASS} ${bodyClassName ?? ''}`.trim()}>
        {children}
      </div>
    )
  }

  return (
    <div className={`${BOOKING_BODY_CLASS} ${bodyClassName ?? ''}`.trim()}>
      {children}
    </div>
  )
}

function StepFooter({ footer }: { footer: ReactNode }) {
  return <div className={BOOKING_FOOTER_CLASS}>{footer}</div>
}

export function BookingStepShell({
  children,
  footer,
  footerKey,
  onSubmit,
  scrollableBody = true,
  bodyClassName,
}: BookingStepShellProps) {
  const body = (
    <StepBody scrollableBody={scrollableBody} bodyClassName={bodyClassName}>
      {children}
    </StepBody>
  )
  const footerNode =
    footer != null ? (
      <StepFooter key={footerKey ?? 'footer'} footer={footer} />
    ) : null

  if (onSubmit) {
    return (
      <div className={BOOKING_SHELL_CLASS}>
        <ParcelPointLogo compact />
        <hr className={BOOKING_HR_CLASS} />
        <form noValidate className={BOOKING_FORM_CLASS} onSubmit={onSubmit}>
          {body}
          {footerNode}
        </form>
      </div>
    )
  }

  return (
    <div className={BOOKING_SHELL_CLASS}>
      <ParcelPointLogo compact />
      <hr className={BOOKING_HR_CLASS} />
      <div className={BOOKING_FORM_CLASS}>
        {body}
        {footerNode}
      </div>
    </div>
  )
}
