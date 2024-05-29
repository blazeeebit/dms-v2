'use client'
import { STUDENT_INFO_FORM } from '@/constants/form'
import React from 'react'
import { Separator } from '../ui/separator'
import { CardTitle } from '../ui/card'
import { useStudentInfo } from '@/hooks/use-profile-hook'
import { FormGenerator } from '../forms/generator'
import { Loader } from '../loader'
import { Button } from '../ui/button'

type StudentSettingsProps = {
  department?: string | null
  studentId?: number | null
  id?: string
}

export const StudentSettings = ({
  department,
  studentId,
  id,
}: StudentSettingsProps) => {
  const { register, errors, loading, onUpdateStudentInfo } = useStudentInfo(
    id!,
    department!,
    studentId!
  )
  return (
    <form onSubmit={onUpdateStudentInfo} className="flex flex-col gap-5">
      <CardTitle>Student Information</CardTitle>
      <Separator orientation="horizontal" />
      <Loader loading={loading}>
        <div className="flex flex-col gap-5 mt-5">
          <div></div>
          {STUDENT_INFO_FORM.map((field) => (
            <FormGenerator
              key={field.id}
              {...field}
              register={register}
              errors={errors}
            />
          ))}
        </div>
        <Button variant="outline">Update</Button>
      </Loader>
    </form>
  )
}
