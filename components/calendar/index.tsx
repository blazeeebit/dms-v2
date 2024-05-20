'use client'

import * as React from 'react'

import { Calendar } from '@/components/ui/calendar'
import { Label } from '../ui/label'

type CalendarPickerProps = {
  label: string
  date: Date | undefined
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

export const CalendarPicker = ({
  label,
  date,
  setDate,
}: CalendarPickerProps) => {
  return (
    <Label className="flex flex-col gap-3">
      {label}
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </Label>
  )
}
