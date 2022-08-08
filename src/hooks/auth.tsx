import React, { createContext, ReactNode, useContext } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

type User = {
  id: string
  name: string
  email: string
  photo?: string
}

interface AuthContextData {
  user: User
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: '2231',
    name: 'Guilherme',
    email: 'guilhermer@gmail.com',
    photo: 'https://github.com/GuiLous.png',
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
