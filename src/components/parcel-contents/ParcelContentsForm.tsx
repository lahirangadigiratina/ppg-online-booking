import { Camera } from 'lucide-react'
import { useId, useState } from 'react'
import { DangerousGoodsModal } from './DangerousGoodsModal'
import { FormField } from '../form/FormField'
import { TextInput } from '../form/TextInput'
import { BookingStepShell } from '../layout/BookingStepShell'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { FormStepFooter } from '../ui/FormStepFooter'
import { AddOnsSection } from '../add-ons/AddOnsSection'
import { ParcelContentsSelect } from './ParcelContentsSelect'

type ParcelContentsFormProps = {
  parcelValue: string
  onParcelValueChange: (value: string) => void
  onBack: () => void
  onContinue: () => void
}

export function ParcelContentsForm({
  parcelValue,
  onParcelValueChange,
  onBack,
  onContinue,
}: ParcelContentsFormProps) {
  const photoInputId = useId()
  const [dangerousGoodsOpen, setDangerousGoodsOpen] = useState(false)

  return (
    <BookingStepShell
      onSubmit={(event) => {
        event.preventDefault()
        onContinue()
      }}
      footer={
        <FormStepFooter onBack={onBack}>
          <ContinueButton type="submit" />
        </FormStepFooter>
      }
    >
      <section className="flex flex-col gap-2">
        <div className="space-y-0.5">
          <StepHeading compact step={5} title="Contents & Add-ons" />
          <button
            type="button"
            className="text-left text-xs font-medium leading-snug text-ppg-orange underline underline-offset-2"
            onClick={() => setDangerousGoodsOpen(true)}
          >
            Prohibited or dangerous goods?
          </button>
        </div>

        <FormField label="What's inside your parcel?" htmlFor="parcelContents">
          <ParcelContentsSelect id="parcelContents" name="parcelContents" />
        </FormField>
      </section>

      <DangerousGoodsModal
        open={dangerousGoodsOpen}
        onClose={() => setDangerousGoodsOpen(false)}
      />

      <FormField
        label={
          <>
            Parcel Value ($) <span className="text-red-500">*</span>
          </>
        }
        htmlFor="parcelValue"
      >
        <TextInput
          id="parcelValue"
          name="parcelValue"
          type="number"
          min={0}
          step="0.01"
          value={parcelValue}
          onChange={(event) => onParcelValueChange(event.target.value)}
          className="font-semibold"
        />
      </FormField>

      <FormField label="Parcel photo (optional)" htmlFor={photoInputId}>
        <label
          htmlFor={photoInputId}
          className="flex cursor-pointer flex-col items-center justify-center rounded-[10px] border border-dashed border-[#d0d0d0] bg-white px-4 py-5 transition-colors hover:border-ppg-orange/50 hover:bg-[#fffaf7]"
        >
          <Camera className="mb-1.5 size-5 text-ppg-label" strokeWidth={1.75} />
          <span className="text-xs text-ppg-label">Take/upload photo</span>
          <input
            id={photoInputId}
            name="parcelPhoto"
            type="file"
            accept="image/*"
            capture="environment"
            className="sr-only"
          />
        </label>
      </FormField>

      <FormField label="Reference number (optional)" htmlFor="referenceNumber">
        <TextInput
          id="referenceNumber"
          name="referenceNumber"
          type="text"
          placeholder="REF2026ORDER001"
          autoComplete="off"
        />
      </FormField>

      <AddOnsSection parcelValueInput={parcelValue} />
    </BookingStepShell>
  )
}
