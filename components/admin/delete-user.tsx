import React from 'react'
import { DropDown } from '../dropdown'
import { Tooltip } from '../tooltip'
import { Ban, Ellipsis, Trash } from 'lucide-react'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { Loader } from '../loader'
import { Card, CardDescription } from '../ui/card'

type DeleteUserProps = {
  onDelete(): void
  loading: boolean
  role: 'ADMIN' | 'OWNER' | 'STUDENT'
  onBan(): void
  banning: boolean
  banned: boolean
}

export const DeleteUser = ({
  onDelete,
  loading,
  role,
  banning,
  onBan,
  banned,
}: DeleteUserProps) => {
  return (
    <div className="absolute right-0 top-0 flex gap-2 items-center">
      <Card className="rounded-full px-3 py-1 bg-muted">
        <CardDescription className="lowercase font-bold">
          {role}
        </CardDescription>
      </Card>
      <DropDown
        label="User Settings"
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
        {role !== 'ADMIN' && (
          <DropdownMenuItem
            className="flex gap-2 cursor-pointer"
            onClick={onBan}
          >
            <Loader loading={banning}>
              <Ban size={20} />
              {banned ? 'Resume' : 'Ban'}
            </Loader>
          </DropdownMenuItem>
        )}
      </DropDown>
    </div>
  )
}
