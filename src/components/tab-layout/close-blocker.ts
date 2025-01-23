import { TabLayoutCloseBlocker } from './types'
import { useEffectOnActive } from 'keepalive-for-react'

// ! one pathname can only have one blocker
// ! so we use a global variable here
const tabCloseBlockerMap = new Map<string, TabLayoutCloseBlocker>()

export const registerCloseBlocker = (
  pathname: string,
  blocker: TabLayoutCloseBlocker
) => {
  tabCloseBlockerMap.set(pathname, blocker)
}

export const cleanCloseBlocker = (pathname: string) => {
  tabCloseBlockerMap.delete(pathname)
}

export const getCloseBlocker = (pathname: string) => {
  return tabCloseBlockerMap.get(pathname)
}

export const useCloseBlocker = (blocker: TabLayoutCloseBlocker) => {
  useEffectOnActive(() => {
    registerCloseBlocker(location.pathname, blocker)
    return () => {
      cleanCloseBlocker(location.pathname)
    }
  }, [blocker])
}
