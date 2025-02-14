import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { useEffectOnActive } from './use-effect-on-active'

export const useSearchParamsSafe = () => {
  const [searchParams] = useSearchParams()
  const [safeSearchParams, setSafeSearchParams] =
    useState<URLSearchParams>(searchParams)

  useEffectOnActive(() => {
    setSafeSearchParams(searchParams)
  }, [searchParams])

  return safeSearchParams
}
