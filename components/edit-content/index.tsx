'use client'
import { useEditDorm } from '@/hooks/use-profile-hook'
import { Pencil } from 'lucide-react'
import React from 'react'
import { FormGenerator } from '../forms/generator'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

type EditContentProps = {
  children: React.ReactNode
  id: string
  name: 'description' | 'name'
}

export const EditContent = ({ children, id, name }: EditContentProps) => {
  const {
    register,
    errors,
    onUpdateDorm,
    onEdit,
    onEnableEdit,
    onDisableEdit,
  } = useEditDorm(id)
  return (
    <div
      className={cn(
        'group flex cursor-pointer w-full rounded-lg',
        !onEdit &&
          'dark:hover:bg-gray-800 hover:bg-cream p-5 transition duration-150 ease-in-out'
      )}
    >
      <div className="flex-1">
        {onEdit ? (
          <form onSubmit={onUpdateDorm} className="flex flex-col py-5 gap-3">
            {name == 'name' ? (
              <FormGenerator
                register={register}
                name={name}
                errors={errors}
                type="text"
                inputType="input"
                placeholder="Change your dorm title"
              />
            ) : name == 'description' ? (
              <FormGenerator
                register={register}
                name={name}
                errors={errors}
                type="text"
                inputType="textarea"
                lines={10}
                placeholder="Change your dorm title"
              />
            ) : (
              <></>
            )}
            <div className="flex justify-end gap-5">
              <Button onClick={onDisableEdit} type="button" variant="outline">
                Cancel
              </Button>
              <Button variant="default" type="submit">
                Update
              </Button>
            </div>
          </form>
        ) : (
          children
        )}
      </div>
      {!onEdit && (
        <div className="w-1/12 flex justify-end items-start">
          <Pencil
            className="group-hover:inline hidden text-gray-400"
            onClick={onEnableEdit}
          />
        </div>
      )}
    </div>
  )
}
