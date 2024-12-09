import { memo, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { hrefToPathname, parseValidHref } from './utils'
import { produce } from 'immer'
import { useMemoizedFn, useMount } from 'ahooks'
import { twJoin } from 'tailwind-merge'
import {
  TabLayoutProps,
  TabLayoutTab,
  TabLayoutApi,
  TabLayoutTabMeta,
} from './type'

export default function TabLayout(props: TabLayoutProps) {
  const { defaultTabs = [] } = props
  const navigate = useNavigate()

  const [tabs, setTabs] = useState<TabLayoutTab[]>(defaultTabs)
  const location = useLocation()

  const activeTab = useMemo(
    () => tabs.find((tab) => tab.pathname === location.pathname),
    [location.pathname, tabs]
  )

  const tabMetaMap = useMemo(() => {
    const map = new Map<string, TabLayoutTabMeta>()
    for (const meta of props.tabMeta) {
      map.set(meta.pathname, meta)
    }
    return map
  }, [props.tabMeta])

  const activateTab: TabLayoutApi['activateTab'] = useMemoizedFn((href) => {
    const pathname = hrefToPathname(href)

    // unregistered tab is not allowed
    if (!tabMetaMap.has(pathname)) return

    setTabs(
      produce((oldTabs) => {
        const existTabIndex = oldTabs.findIndex(
          (tab) => tab.pathname === pathname
        )
        if (existTabIndex !== -1) {
          const tab = oldTabs[existTabIndex]
          tab.href = href
        } else {
          const newTab: TabLayoutTab = {
            pathname,
            href,
          }
          oldTabs.push(newTab)
        }
        return oldTabs
      })
    )

    navigate(href)
  })

  const closeTab = (pathname: string) => {
    const newTabs = tabs.filter((tab) => tab.pathname !== pathname)
    setTabs(newTabs)
    // if active tab closed, activate the last tab
    if (activeTab?.pathname === pathname) {
      const lastTab = newTabs.at(-1)
      if (lastTab) {
        navigate(lastTab.href)
      }
    }
  }

  ////
  // Tab
  ////
  const tabOnActivate: TabProps['onActivate'] = useMemoizedFn((tab) => {
    navigate(tab.href)
  })
  const tabOnClose: TabProps['onClose'] = useMemoizedFn((tab) => {
    closeTab(tab.pathname)
  })

  ////
  // Api
  ////
  useEffect(() => {
    if (props.api) {
      props.api.current = {
        activateTab,
      }
    }
  }, [props.api, activateTab])

  useInitializeMissingTab(tabs, activateTab)

  const registeredTabs = useMemo(
    () => tabs.filter((tab) => tabMetaMap.has(tab.pathname)),
    [tabs, tabMetaMap]
  )

  return (
    <div className="flex">
      {registeredTabs.map((tab) => (
        <MemoTab
          key={tab.pathname}
          tab={tab}
          active={tab === activeTab}
          onActivate={tabOnActivate}
          onClose={tabOnClose}
          {...tabMetaMap.get(tab.pathname)!}
        />
      ))}
    </div>
  )
}

type TabProps = {
  tab: TabLayoutTab
  active: boolean
  onActivate: (tab: TabLayoutTab) => void
  onClose: (tab: TabLayoutTab) => void
} & TabLayoutTabMeta
function Tab(props: TabProps) {
  return (
    <div
      className={twJoin(
        'hover:cursor-pointer flex basis-40 flex-shrink px-2',
        props.active ? 'bg-blue-200' : undefined
      )}
      onClick={() => {
        if (props.active) return
        props.onActivate(props.tab)
      }}
    >
      <div className="flex-1 truncate">{props.label}</div>

      {props.closable && (
        <div className="ml-1" onClick={() => props.onClose(props.tab)}>
          x
        </div>
      )}
    </div>
  )
}
const MemoTab = memo(Tab)

/**
 * when refresh page, if location match a registered tab
 * activate this tab automatically
 */
const useInitializeMissingTab = (
  tabs: TabLayoutTab[],
  activateTab: TabLayoutApi['activateTab']
) => {
  useMount(() => {
    const location = window.location
    const existTabIndex = tabs.findIndex(
      (tab) => tab.pathname === location.pathname
    )
    if (existTabIndex === -1) {
      activateTab(parseValidHref(location))
    }
  })
}
