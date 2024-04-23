'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CreateDormListingProps } from '@/schemas/list.schema'
import { ErrorMessage } from '@hookform/error-message'
import { FileImage, X } from 'lucide-react'
import Image from 'next/image'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

type CreateGalleryProps = {
  register: UseFormRegister<CreateDormListingProps>
  errors: FieldErrors<FieldValues>
  images?: string
  onRemove(): void
}

export const CreateGallery = ({
  register,
  errors,
  images,
  onRemove,
}: CreateGalleryProps) => {
  return (
    <div>
      {images ? (
        <Card className="w-full relative aspect-square">
          <Card
            className="absolute right-5 top-5 p-1 z-50 cursor-pointer"
            onClick={onRemove}
          >
            <X />
          </Card>
          <Image src={images} alt="Thumbnail" fill objectFit="contain" />
        </Card>
      ) : (
        <Label htmlFor="image-main">
          <Card className="flex justify-center items-center py-24 border-dashed border-2 hover:bg-cream dark:hover:bg-gray-900 transition duration-150 cursor-pointer">
            <FileImage size={30} className="text-gray-500" />
            <Input
              {...register('thumbnail')}
              type="file"
              id="image-main"
              className="hidden"
            />
          </Card>
          <ErrorMessage
            errors={errors}
            name="thumbnail"
            render={({ message }) => (
              <p className="text-red-400 mt-4">
                {message === 'Required' ? '' : message}
              </p>
            )}
          />
        </Label>
      )}
    </div>
  )
}
