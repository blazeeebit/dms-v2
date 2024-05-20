'use client'
import React from 'react'
import { Slider } from '../slider'
import { SwiperSlide } from 'swiper/react'
import { Card, CardContent, CardDescription } from '../ui/card'
import { Plus, X } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useImageGallery } from '@/hooks/use-dormitories-hook'
import { Modal } from '../modal'
import { DMS_CONTENT } from '@/constants/language'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Loader } from '../loader'

type EditCreateGalleryProps = {
  id: string
  gallery: { id: string; image: string }[]
}

export const EditCreateGallery = ({ gallery, id }: EditCreateGalleryProps) => {
  const {
    onSetMultiFile,
    language,
    files,
    loading,
    onRemoveImagePreview,
    onSaveGallery,
  } = useImageGallery(id)
  return (
    <div>
      <Slider
        offset={0}
        breakpoints={{
          300: {
            slidesPerView: 2.2,
          },
          700: {
            slidesPerView: 1.7,
          },
        }}
      >
        {gallery &&
          gallery.map((gal) => (
            <SwiperSlide key={gal.id}>
              <Card className="relative aspect-square overflow-hidden rounded-lg">
                <Image src={gal.image} alt="img" fill />
              </Card>
            </SwiperSlide>
          ))}
        <SwiperSlide>
          <Modal
            className="max-w-3xl"
            title={DMS_CONTENT.IMAGE_GALLERY[language].content.modal.title}
            description={
              DMS_CONTENT.IMAGE_GALLERY[language].content.modal.description
            }
            trigger={
              <Card className="rounded-xl cursor-pointer hover:bg-cream dark:hover:bg-gray-800 transition duration-150 ease-in-out">
                <CardContent className="flex flex-col justify-center p-0 items-center aspect-square">
                  <Plus className="text-gray-600" />
                  <CardDescription>Add an Image</CardDescription>
                </CardContent>
              </Card>
            }
          >
            <div className="flex items-end flex-col gap-5">
              <Card className="w-full p-5 border-4 border-dashed flex gap-5 flex-wrap">
                {files.map((file, key) => (
                  <div key={key} className="relative w-48 h-48">
                    <Card
                      className="p-2 absolute right-2 top-2 z-50 cursor-pointer"
                      onClick={() => onRemoveImagePreview(key)}
                    >
                      <X size={10} />
                    </Card>
                    <Image
                      className="rounded-md z-40"
                      src={URL.createObjectURL(file)}
                      alt="Img"
                      fill
                    />
                  </div>
                ))}
              </Card>
              <div className="flex gap-3">
                <Label htmlFor="gallery-image">
                  <Card className="px-4 h-full cursor-pointer flex items-center">
                    Upload Images
                    <Input
                      className="hidden"
                      id="gallery-image"
                      type="file"
                      multiple
                      onChange={onSetMultiFile}
                    />
                  </Card>
                </Label>
                <Button
                  onClick={onSaveGallery}
                  variant="default"
                  className="py-1 px-6"
                >
                  <Loader loading={loading}>Save</Loader>
                </Button>
              </div>
            </div>
          </Modal>
        </SwiperSlide>
      </Slider>
    </div>
  )
}
