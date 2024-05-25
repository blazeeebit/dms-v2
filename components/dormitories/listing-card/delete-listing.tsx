'use client'
import { DropDown } from '@/components/dropdown'
import { Loader } from '@/components/loader'
import { Tooltip } from '@/components/tooltip'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useDeleteDorm } from '@/hooks/use-dormitories-hook'
import { Ellipsis, Trash } from 'lucide-react'
import React from 'react'

type DeleteDormListingProps = {
  id: string
}

export const DeleteDormListing = ({ id }: DeleteDormListingProps) => {
  const { onDelete, loading } = useDeleteDorm(id)
  return (
    <div className="ml-5">
      <DropDown
        label="Dorm Settings"
        trigger={
          <span>
            <Tooltip trigger={<Ellipsis />}>Options</Tooltip>
          </span>
        }
      >
        <DropdownMenuItem
          className="flex gap-2 cursor-pointer"
          onClick={onDelete}
        >
          <Loader loading={loading}>
            <Trash size={20} />
            Delete
          </Loader>
        </DropdownMenuItem>
      </DropDown>
    </div>
  )
}
