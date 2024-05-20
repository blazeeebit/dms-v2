'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Search, Trash } from 'lucide-react'
import { UISkeletons } from '../skeletons'
import { useCompareDorm } from '@/hooks/use-dormitories-hook'
import Image from 'next/image'
import { Loader } from '../loader'
import { ServiceChip } from '../services/service-chip'

type CompareCardProps = {
  onDelete(): void
  id: string
}

export const CompareCard = ({ onDelete, id }: CompareCardProps) => {
  const {
    onSelectDorm,
    loading,
    compareDorm,
    register,
    searchQuery,
    dormSearch,
    loadingDorm,
    language,
  } = useCompareDorm(id)
  return (
    <Card className="col-span-1">
      <CardContent className="py-5">
        <Loader loading={loadingDorm}>
          {compareDorm ? (
            <div className="flex flex-col gap-5">
              <div className="w-full rounded-lg overflow-hidden aspect-video relative">
                <Image src={compareDorm.featuredImage} alt="thumbnail" fill />
              </div>
              <div className="flex justify-between">
                {compareDorm.language.map(
                  (lang) =>
                    lang.language == language && (
                      <CardTitle key={lang.name}>{lang.name}</CardTitle>
                    )
                )}
                <Trash onClick={onDelete} className="cursor-pointer" />
              </div>
              {compareDorm.language.map(
                (lang) =>
                  lang.language == language && (
                    <CardDescription key={lang.name}>
                      {lang.description}
                    </CardDescription>
                  )
              )}
              <div className="flex flex-wrap gap-3">
                {compareDorm.service.map((service, i) => (
                  <ServiceChip
                    key={i}
                    name={service.name}
                    icon={service.icon}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              <Card className="px-3 py-1 flex items-center gap-3">
                <Search />
                <Input
                  {...register('query')}
                  placeholder="Search Dorm To Compare..."
                  className="border-none"
                />
                <Trash onClick={onDelete} className="cursor-pointer" />
              </Card>
              {searchQuery.length > 0 && (
                <Card>
                  <CardContent className="py-3 flex flex-col gap-2">
                    {loading ? (
                      <UISkeletons skeleton="search" />
                    ) : (
                      dormSearch.map((dorm) => (
                        <Card
                          key={dorm.id}
                          onClick={() => onSelectDorm(dorm.id)}
                        >
                          <CardContent className="p-3 flex gap-3 dark:hover:bg-gray-800 transition duration-150 ease-in-out">
                            <div className="w-16 rounded-lg overflow-hidden h-16 relative">
                              <Image
                                src={dorm.featuredImage}
                                alt="thumbnail"
                                fill
                              />
                            </div>
                            <div>
                              <CardTitle className="text-lg">
                                {dorm.language[0].name}
                              </CardTitle>
                              <CardDescription>
                                {dorm.language[0].description &&
                                dorm.language[0].description.length > 30
                                  ? dorm.language[0].description.substring(
                                      0,
                                      30
                                    ) + '...'
                                  : dorm.language[0].description}
                              </CardDescription>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </Loader>
      </CardContent>
    </Card>
  )
}
