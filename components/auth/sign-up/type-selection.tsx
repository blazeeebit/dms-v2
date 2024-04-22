import React from 'react'
import { UserTypeCard } from './user-type-card'
import { UseFormRegister } from 'react-hook-form'

type TypeSelectionFormProps = {
  register: UseFormRegister<any>
  userType: 'OWNER' | 'STUDENT'
  setUserType: React.Dispatch<React.SetStateAction<'OWNER' | 'STUDENT'>>
}

export const TypeSelectionForm = ({
  register,
  userType,
  setUserType,
}: TypeSelectionFormProps) => {
  return (
    <div className="flex gap-5">
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="OWNER"
        title="I own dormitories"
        text="Providing dorms to students"
      />
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="STUDENT"
        title="Im a student"
        text="Looking to for a dorm"
      />
    </div>
  )
}
