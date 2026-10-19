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
  onSubmit?: FormEventHandler<HTMLFormElement>
  /** Middle content scrolls inside the phone when taller than the viewport */
  scrollableBody?: boolean
}

function StepBody({
  scrollableBody,
  children,
}: {
  scrollableBody: boolean
  children: ReactNode
}) {
  if (scrollableBody) {
    return <div className={BOOKING_SCROLL_BODY_CLASS}>{children}</div>
  }

  return <div className={BOOKING_BODY_CLASS}>{children}</div>
}

function StepFooter({ footer }: { footer: ReactNode }) {
  return <div className={BOOKING_FOOTER_CLASS}>{footer}</div>
}

export function BookingStepShell({
  children,
  footer,
  onSubmit,
  scrollableBody = true,
}: BookingStepShellProps) {
  const body = <StepBody scrollableBody={scrollableBody}>{children}</StepBody>

  if (onSubmit) {
    return (
      <div className={BOOKING_SHELL_CLASS}>
        <ParcelPointLogo compact />
        <hr className={BOOKING_HR_CLASS} />
        <form noValidate className={BOOKING_FORM_CLASS} onSubmit={onSubmit}>
          {body}
          {footer ? <StepFooter footer={footer} /> : null}
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
        {footer ? <StepFooter footer={footer} /> : null}
      </div>
    </div>
  )
}
