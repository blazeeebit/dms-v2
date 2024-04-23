'use client'
import React from 'react'
import { CreateGallery } from '../create-gallery'
import { useCreateDorm } from '@/hooks/use-dormitories-hook'
import { CREATE_LISTING_FORM, FormProps } from '@/constants/form'
import { FormGenerator } from '@/components/forms/generator'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

type ListingFormProps = {
  id: string
}

export const ListingForm = ({ id }: ListingFormProps) => {
  const { register, errors, onCreateListing, preview, onRemovePreview } =
    useCreateDorm(id)

  return (
    <form
      className="py-10 pb-20 overflow-y-auto no-scroll-window max-h-full flex flex-col gap-5"
      onSubmit={onCreateListing}
    >
      <Label>
        <p className="mb-1">Featured Image</p>
        <CreateGallery
          register={register}
          onRemove={onRemovePreview}
          errors={errors}
          images={preview}
        />
      </Label>
      <div className="w-full flex flex-col gap-5 mt-5">
        {CREATE_LISTING_FORM.map((fields: FormProps) => (
          <FormGenerator
            key={fields.id}
            {...fields}
            register={register}
            errors={errors}
          />
        ))}
      </div>
      <div>
        <Button className="w-full">Create Listing</Button>
      </div>
    </form>
  )
}
