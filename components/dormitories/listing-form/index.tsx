'use client'
import React from 'react'
import { CreateGallery } from '../create-gallery'
import { useCreateDorm } from '@/hooks/use-dormitories-hook'
import { CREATE_LISTING_FORM, FormProps } from '@/constants/form'
import { FormGenerator } from '@/components/forms/generator'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/loader'
import { Slider } from '@/components/slider'
import { SwiperSlide } from 'swiper/react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ErrorMessage } from '@hookform/error-message'
import { DescriptionGeneration } from '@/components/ai/description-generation'

type ListingFormProps = {
  id: string
  services:
    | {
        id: string
        name: string
        icon: string
      }[]
    | undefined
}

export const ListingForm = ({ id, services }: ListingFormProps) => {
  const {
    register,
    errors,
    onCreateListing,
    preview,
    onRemovePreview,
    loading,
    onAddService,
    services: serviceArray,
    setValue,
    name,
  } = useCreateDorm(id)

  return (
    <form
      className="py-10 pb-20 overflow-y-auto no-scroll-window max-h-full flex flex-col gap-5"
      onSubmit={onCreateListing}
    >
      <Loader loading={loading}>
        <Label>
          <p className="mb-1">Featured Image</p>
          <CreateGallery
            register={register}
            onRemove={onRemovePreview}
            errors={errors}
            images={preview}
          />
        </Label>
        {services?.length && (
          <div className="w-full flex flex-col mt-5">
            <Label htmlFor="slider">
              Add Services
              <div className="w-full mt-3 cursor-pointer" id="slider">
                <Slider
                  offset={0}
                  breakpoints={{
                    300: {
                      slidesPerView: 2.2,
                    },
                    700: {
                      slidesPerView: 2.4,
                    },
                    1200: {
                      slidesPerView: 3.5,
                    },
                  }}
                >
                  {services.map((services) => (
                    <SwiperSlide
                      key={services.id}
                      onClick={() =>
                        onAddService({
                          name: services.name,
                          icon: services.icon,
                        })
                      }
                    >
                      <Card
                        className={cn(
                          'p-3',
                          serviceArray.some(
                            (service) => service.name == services.name
                          )
                            ? ''
                            : 'opacity-50'
                        )}
                      >
                        <CardContent className="p-0 flex justify-center">
                          {services.name}
                        </CardContent>
                      </Card>
                    </SwiperSlide>
                  ))}
                </Slider>
                <ErrorMessage
                  errors={errors}
                  name="services"
                  render={({ message }) => (
                    <p className="text-red-400 mt-2">
                      {message === 'Required' ? '' : message}
                    </p>
                  )}
                />
              </div>
            </Label>
          </div>
        )}
        <div className="w-full flex flex-col gap-5 mt-5">
          {CREATE_LISTING_FORM.map((fields: FormProps) =>
            fields.inputType == 'textarea' ? (
              <Card key={fields.id} className="p-3 flex flex-col gap-2">
                <FormGenerator
                  {...fields}
                  register={register}
                  errors={errors}
                />
                <div className="flex justify-end">
                  <DescriptionGeneration
                    name={name}
                    id={id}
                    services={serviceArray}
                    setDescription={setValue}
                  />
                </div>
              </Card>
            ) : (
              <FormGenerator
                key={fields.id}
                {...fields}
                register={register}
                errors={errors}
              />
            )
          )}
        </div>
        <div>
          <Button className="w-full">Create Listing</Button>
        </div>
      </Loader>
    </form>
  )
}
