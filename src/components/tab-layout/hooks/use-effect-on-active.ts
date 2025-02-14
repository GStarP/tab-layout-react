import { useContext, useEffect } from 'react'
import { TabReactiveContext } from '../context'

export const useEffectOnActive: typeof useEffect = (cb, deps) => {
  const { isActive } = useContext(TabReactiveContext)
  useEffect(() => {
    if (isActive) {
      return cb()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cb, isActive, ...(deps ?? [])])
}
