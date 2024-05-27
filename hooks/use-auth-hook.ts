import { useToast } from '@/components/ui/use-toast'
import { useSignIn, useSignUp } from '@clerk/nextjs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CompleteOnBoardingProps,
  CompleteOnBoardingSchema,
  SignUpUserProps,
  SignUpUserSchema,
  SignInUserSchema,
  SignInUserProps,
} from '@/schemas/auth.schema'
import { OAuthStrategy } from '@clerk/types'
import {
  completeOnBoarding,
  onCompleteEmailPasswordSignUp,
} from '@/actions/auth'
import { useRouter } from 'next/navigation'

export const useAuthSignIn = () => {
  const { isLoaded, setActive, signIn } = useSignIn()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInUserProps>({
    resolver: zodResolver(SignInUserSchema),
    mode: 'onChange',
  })
  const onCompleteLoginWithEmailPassword = handleSubmit(
    async (values: SignInUserProps) => {
      if (!isLoaded) return
      try {
        setLoading(true)
        const completeLogin = await signIn.create({
          identifier: values.email,
          password: values.password,
        })

        if (completeLogin.status === 'complete') {
          await setActive({ session: completeLogin.createdSessionId })
          toast({
            title: 'Success',
            description: 'Welcome back!',
          })
          router.push('/dashboard')
        }
      } catch (error: any) {
        setLoading(false)
        if (error.errors[0].code === 'form_password_incorrect')
          toast({
            title: 'Error',
            description: 'email/password is incorrect try again',
          })
      }
    }
  )
  return {
    register,
    onCompleteLoginWithEmailPassword,
    errors,
    loading,
    handleSubmit,
  }
}

export const useAuthSignUp = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const { isLoaded, setActive, signUp } = useSignUp()
  const [generateOtp, setGenerateOtp] = useState<boolean>(false)
  const [generatedOTP, setGeneratedOTP] = useState<boolean>(false)
  const [otp, setOtp] = useState<string>('')
  const [onUserType, setOnUserType] = useState<'OWNER' | 'STUDENT'>('OWNER')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SignUpUserProps>({
    resolver: zodResolver(SignUpUserSchema),
    defaultValues: {
      role: 'OWNER',
    },
  })

  const onGenerateOTP = async () => {
    if (!isLoaded) return

    const email = getValues('email')
    const password = getValues('password')

    try {
      setGenerateOtp(true)
      await signUp.create({
        emailAddress: email,
        password: password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setGeneratedOTP(true)
    } catch (error: any) {
      setGenerateOtp(false)
      toast({
        title: 'Error',
        description: error.errors[0].longMessage,
      })
    }
  }

  setValue('otp', otp)

  const onCompleteSignUp = handleSubmit(async (values: SignUpUserProps) => {
    if (!isLoaded) return

    try {
      setLoading(true)
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: values.otp,
      })

      if (completeSignUp.status !== 'complete') {
        setLoading(false)
        toast({
          title: 'Error',
          description: 'Something went wrong!',
        })
      }

      if (completeSignUp.status == 'complete') {
        if (!signUp.createdUserId) return

        const registered = await onCompleteEmailPasswordSignUp(
          signUp.createdUserId,
          values.name,
          values.username,
          values.role
        )

        console.log(registered)

        if (registered?.status == 200) {
          await setActive({
            session: completeSignUp.createdSessionId,
          })

          toast({
            title: 'Success',
            description: registered.message,
          })

          setLoading(false)
          router.push('/dashboard')
        }

        if (registered?.status == 400) {
          setLoading(false)
          toast({
            title: 'Error',
            description: 'Something went wrong!',
          })
        }
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.errors[0].longMessage,
      })
    }
  })

  return {
    register,
    onCompleteSignUp,
    errors,
    loading,
    setOtp,
    otp,
    onGenerateOTP,
    generateOtp,
    generatedOTP,
    onUserType,
    setOnUserType,
  }
}

export const useOAuth = () => {
  const { signIn, isLoaded: LoadedSignIn } = useSignIn()
  const { signUp, isLoaded: LoadedSignUp } = useSignUp()

  const signInWith = (strategy: OAuthStrategy) => {
    if (!LoadedSignIn) return
    try {
      return signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: '/callback',
        redirectUrlComplete: '/dashboard',
      })
    } catch (error) {
      console.log(error)
    }
  }

  const signUpWith = (strategy: OAuthStrategy) => {
    if (!LoadedSignUp) return
    try {
      return signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: '/callback',
        redirectUrlComplete: '/dashboard',
      })
    } catch (error) {
      console.log(error)
    }
  }

  return { signInWith, signUpWith }
}

export const useOnBoarding = () => {
  const { register, handleSubmit } = useForm<CompleteOnBoardingProps>({
    resolver: zodResolver(CompleteOnBoardingSchema),
    defaultValues: {
      role: 'STUDENT',
    },
  })
  const { toast } = useToast()
  const router = useRouter()
  const [onUserType, setOnUserType] = useState<'OWNER' | 'STUDENT'>('STUDENT')
  const [loading, setLoading] = useState<boolean>(false)

  const onCompleteOnBoarding = handleSubmit(
    async (values: CompleteOnBoardingProps) => {
      setLoading(true)
      try {
        const onBoarded = await completeOnBoarding(values.role)
        if (onBoarded) {
          toast({
            title: onBoarded.status == 200 ? 'Success' : 'Error',
            description: onBoarded.message,
          })
          setLoading(false)
          if (onBoarded.role == 'OWNER') {
            console.log('On boarding success Owner')
            router.push(`/dashboard/owner/${onBoarded.id}/overview`)
          }
          if (onBoarded.role == 'STUDENT') {
            console.log('On boarding success Sutdnet')
            router.push(`/dashboard/student/${onBoarded.id}/overview`)
          }
        }
      } catch (error: any) {
        if (error.message == 'NEXT_REDIRECT') {
          throw error
        }
      }
    }
  )
  return { register, onCompleteOnBoarding, onUserType, setOnUserType, loading }
}
