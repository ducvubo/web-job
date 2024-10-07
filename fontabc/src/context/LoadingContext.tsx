'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

interface ILoadingContextProps {
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

const LoadingContext = createContext<ILoadingContextProps | undefined>(undefined)

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setLoading] = useState(false)

  return <LoadingContext.Provider value={{ isLoading, setLoading }}>{children}</LoadingContext.Provider>
}

export const useLoading = () => {
  const context = useContext(LoadingContext)

  if (context === undefined) {
    throw new Error('useLoading getting error')
  }

  return context
}
