'use client'
import { useCompare } from '@/hooks/use-dormitories-hook'
import { Plus } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { CompareCard } from './compare-card'

type CompareDormsProps = {
  id: string
}

export const CompareDorms = ({ id }: CompareDormsProps) => {
  const { columns, onAddDormToCompare, onDeleteDormToCompare } = useCompare()
  return (
    <div className="flex-1 h-0 grid grid-cols-1 lg:grid-cols-2 gap-5 py-10 overflow-auto no-scroll-window content-start">
      {columns.length > 0 ? (
        <>
          {columns.map((dorm, i) => (
            <CompareCard
              id={id}
              onDelete={() => onDeleteDormToCompare(i)}
              key={dorm}
            />
          ))}
          {columns.length < 4 && (
            <div className="col-span-1 flex justify-center items-center">
              <Button variant="outline" onClick={onAddDormToCompare}>
                <Plus />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="col-span-2 flex justify-center items-center">
          <Button variant="outline" onClick={onAddDormToCompare}>
            <Plus />
          </Button>
        </div>
      )}
    </div>
  )
}
