import { v4 as uuidv4 } from 'uuid'

export type UserAuthFormProps = {
  id: string
  type: 'email' | 'text' | 'password'
  inputType: 'select' | 'input'
  options?: { value: string; label: string; id: string }[]
  label?: string
  placeholder: string
  name: string
}

export const USER_SIGNUP_FORM: UserAuthFormProps[] = [
  {
    id: uuidv4(),
    type: 'text',
    inputType: 'input',
    placeholder: 'Enter your full name',
    name: 'name',
  },
  {
    id: uuidv4(),
    type: 'email',
    inputType: 'input',
    placeholder: 'Enter your email address',
    name: 'email',
  },
  {
    id: uuidv4(),
    type: 'text',
    inputType: 'input',
    placeholder: 'Enter your username',
    name: 'username',
  },
  {
    id: uuidv4(),
    type: 'password',
    inputType: 'input',
    placeholder: 'Enter your password',
    name: 'password',
  },
  {
    id: uuidv4(),
    type: 'password',
    inputType: 'input',
    placeholder: 'Please confirm your password',
    name: 'confirmPassword',
  },
]

export const USER_SIGNIN_FORM: UserAuthFormProps[] = [
  {
    id: uuidv4(),
    type: 'email',
    inputType: 'input',
    placeholder: 'Enter your email address',
    name: 'email',
  },
  {
    id: uuidv4(),
    type: 'password',
    inputType: 'input',
    placeholder: 'Enter your password',
    name: 'password',
  },
]
