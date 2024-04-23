import { v4 as uuidv4 } from 'uuid'

export type FormProps = {
  id: string
  type?: 'email' | 'text' | 'password' | 'number'
  inputType: 'select' | 'input' | 'textarea'
  options?: { value: string; label: string; id: string }[]
  label?: string
  placeholder: string
  name: string
  lines?: number
}

export const USER_SIGNUP_FORM: FormProps[] = [
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

export const USER_SIGNIN_FORM: FormProps[] = [
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

export const CREATE_LISTING_FORM: FormProps[] = [
  {
    id: uuidv4(),
    type: 'text',
    inputType: 'input',
    placeholder: 'Whats your dorm called?',
    name: 'name',
    label: 'Dorm Name',
  },
  {
    id: uuidv4(),
    type: 'text',
    inputType: 'input',
    placeholder: 'Mention your price',
    name: 'price',
    label: 'Dorm Price',
  },
  {
    id: uuidv4(),
    inputType: 'textarea',
    placeholder: 'Give a description that stands out',
    name: 'description',
    label: 'Dorm Description',
    lines: 20,
  },
]
