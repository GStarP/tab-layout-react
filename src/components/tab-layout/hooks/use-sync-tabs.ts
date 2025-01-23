import { ITab, ITabMeta } from '../types'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { locationToHref } from '../utils'
import { produce } from 'immer'

/**
 * sync tabs state when location change
 */
export const useSyncTabs = (
  setTabs: React.Dispatch<React.SetStateAction<ITab[]>>,
  tabMetaMap: Map<string, ITabMeta>
) => {
  const location = useLocation()

  useEffect(() => {
    setTabs(
      produce((tabs) => {
        const targetTab = tabs.find((tab) => tab.pathname === location.pathname)
        if (targetTab) {
          targetTab.href = locationToHref(location)
        } else {
          tabs.push({
            pathname: location.pathname,
            href: locationToHref(location),
          })
        }
        return tabs
      })
    )
  }, [location, setTabs, tabMetaMap])
}
