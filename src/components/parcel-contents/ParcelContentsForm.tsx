import { Camera } from 'lucide-react'
import { useId } from 'react'
import { ParcelPointLogo } from '../branding/ParcelPointLogo'
import { FormField } from '../form/FormField'
import { TextInput } from '../form/TextInput'
import { StepHeading } from '../steps/StepHeading'
import { ContinueButton } from '../ui/ContinueButton'
import { ParcelContentsSelect } from './ParcelContentsSelect'

type ParcelContentsFormProps = {
  onContinue: () => void
}

export function ParcelContentsForm({ onContinue }: ParcelContentsFormProps) {
  const photoInputId = useId()

  return (
    <>
      <ParcelPointLogo />
      <hr className="-mx-6 mb-6 border-0 border-t border-ppg-border" />

      <form
        className="flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault()
          onContinue()
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <StepHeading
            step={5}
            title="Parcel Contents"
            titleClassName="whitespace-nowrap"
          />
          <a
            href="#dangerous-goods"
            className="shrink-0 text-xs font-medium text-ppg-orange underline underline-offset-2"
            onClick={(event) => event.preventDefault()}
          >
            Dangerous goods?
          </a>
        </div>

        <FormField label="What's inside your parcel?" htmlFor="parcelContents">
          <ParcelContentsSelect id="parcelContents" name="parcelContents" required />
        </FormField>

        <FormField label="Parcel Value ($)" htmlFor="parcelValue">
          <TextInput
            id="parcelValue"
            name="parcelValue"
            type="number"
            min={0}
            step="0.01"
            defaultValue={50}
            required
            className="font-semibold"
          />
        </FormField>

        <FormField label="Parcel photo (optional)" htmlFor={photoInputId}>
          <label
            htmlFor={photoInputId}
            className="flex cursor-pointer flex-col items-center justify-center rounded-[10px] border border-dashed border-[#d0d0d0] bg-white px-4 py-8 transition-colors hover:border-ppg-orange/50 hover:bg-[#fffaf7]"
          >
            <Camera className="mb-2 size-6 text-ppg-label" strokeWidth={1.75} />
            <span className="text-sm text-ppg-label">Take/upload photo</span>
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
            placeholder="e.g. REF2026ORDER001"
            autoComplete="off"
          />
        </FormField>

        <div className="flex justify-end pt-2">
          <ContinueButton type="submit" />
        </div>
      </form>
    </>
  )
}
