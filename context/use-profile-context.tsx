'use client'

import { createContext, useContext, useState } from 'react'

type ProfileStateProps = {
  language: 'TURKISH' | 'ENGLISH'
  username?: string
  role?: 'OWNER' | 'STUDENT' | 'ADMIN'
}

type ProfileAction = 'LANGUAGE' | 'LOGIN' | 'LOGOUT'

type ProfileInitialValuesProps = {
  user: ProfileStateProps
  onDispatch(action: ProfileAction, state: ProfileStateProps): void
}

const ProfileInitialValues: ProfileInitialValuesProps = {
  user: {
    language: 'ENGLISH',
    username: undefined,
    role: undefined,
  },
  onDispatch: () => undefined,
}

const profileContext = createContext(ProfileInitialValues)

const { Provider } = profileContext

type withChildren = {
  children: React.ReactNode
}

export const ProfileProvider = ({ children }: withChildren) => {
  const [user, setUser] = useState(ProfileInitialValues.user)

  const onDispatch = (action: ProfileAction, state: ProfileStateProps) => {
    console.log(action)
    switch (action) {
      case 'LANGUAGE':
        return setUser((prev) => ({
          ...prev,
          language: state.language == 'ENGLISH' ? 'TURKISH' : 'ENGLISH',
        }))
      case 'LOGIN':
        console.log(state)
        return setUser((prev) => ({
          ...prev,
          language: state.language,
          username: state.username,
          role: state.role,
        }))
      case 'LOGOUT':
        console.log(state)
        return setUser((prev) => ({
          ...prev,
          language: state.language,
          username: state.username,
          role: state.role,
        }))
    }
  }

  const values = {
    onDispatch,
    user,
  }

  return <Provider value={values}>{children}</Provider>
}

export const useProfileContext = () => {
  const state = useContext(profileContext)
  return state
}
