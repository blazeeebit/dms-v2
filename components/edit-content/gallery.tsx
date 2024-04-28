'use client'
import React from 'react'
import { Slider } from '../slider'
import { SwiperSlide } from 'swiper/react'
import { Card, CardContent, CardDescription } from '../ui/card'
import { Plus } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

type EditCreateGalleryProps = {
  gallery: any[]
}

export const EditCreateGallery = ({ gallery }: EditCreateGalleryProps) => {
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
        {gallery.length > 0 &&
          gallery.map((gallery) => <div key={gallery.id}>Gallery</div>)}
        <SwiperSlide>
          <Label htmlFor="gallery">
            <Card className="rounded-xl cursor-pointer hover:bg-cream dark:hover:bg-gray-800 transition duration-150 ease-in-out">
              <CardContent className="flex flex-col justify-center p-0 items-center aspect-square">
                <Plus className="text-gray-600" />
                <CardDescription>Add an Image</CardDescription>
                <Input className="hidden" id="gallery" type="file" />
              </CardContent>
            </Card>
          </Label>
        </SwiperSlide>
      </Slider>
    </div>
  )
}
