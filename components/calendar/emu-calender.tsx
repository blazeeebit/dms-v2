'use client'

import { useAdminCalender } from '@/hooks/use-admin-hook'
import React from 'react'
import { FormGenerator } from '../forms/generator'
import { Button } from '../ui/button'
import { Loader } from '../loader'

export const EmuCalenderForm = () => {
  const { onCreateCalender, loading, register, errors } = useAdminCalender()
  return (
    <form className="flex flex-col gap-5 mt-10" onSubmit={onCreateCalender}>
      <FormGenerator
        register={register}
        name="url"
        placeholder="Enter the calender domain"
        inputType="input"
        type="text"
        errors={errors}
        label="Calender Domain"
      />
      <FormGenerator
        register={register}
        name="title"
        placeholder="Enter the calender title"
        inputType="input"
        type="text"
        errors={errors}
        label="Calender Title"
      />
      <Button>
        <Loader loading={loading}>Integrate</Loader>
      </Button>
    </form>
  )
}
