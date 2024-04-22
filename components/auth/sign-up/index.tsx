'use client'

import { useAuthSignUp } from '@/hooks/use-auth-hook'
import { AuthHeader } from '../header'
import { USER_SIGNUP_FORM, UserAuthFormProps } from '@/constants/form'
import { FormGenerator } from '@/components/forms/generator'
import { Button } from '@/components/ui/button'
import { OtpInput } from '@/components/otp-input'
import { Loader } from '@/components/loader'
import { TypeSelectionForm } from './type-selection'
import Link from 'next/link'

export const SignUpForm = () => {
  const {
    register,
    onCompleteSignUp,
    loading,
    errors,
    otp,
    setOtp,
    generateOtp,
    onGenerateOTP,
    generatedOTP,
    onUserType,
    setOnUserType,
  } = useAuthSignUp()
  return (
    <form onSubmit={onCompleteSignUp} className="flex flex-col gap-5">
      <AuthHeader
        title="Create an account"
        text="Tell us about yourself! What do you do? Let’s tailor your experience so it best suits you."
      />
      <TypeSelectionForm
        userType={onUserType}
        setUserType={setOnUserType}
        register={register}
      />
      <div className="flex flex-col gap-3">
        {USER_SIGNUP_FORM.map((fields: UserAuthFormProps) => (
          <FormGenerator
            key={fields.id}
            {...fields}
            register={register}
            errors={errors}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {!generateOtp ? (
          <Button className="" type="button" onClick={onGenerateOTP}>
            Generate OTP
          </Button>
        ) : (
          <Loader loading={!generatedOTP}>
            <div className="flex py-3 justify-center">
              <OtpInput otp={otp} setOtp={setOtp} />
            </div>
            <Button type="submit" variant="outline">
              <Loader loading={loading}>Complete Registration</Loader>
            </Button>
          </Loader>
        )}
      </div>
      <p>
        Already have an account?{' '}
        <Link href="/sign-in" className="font-bold">
          Sign In
        </Link>
      </p>
    </form>
  )
}
