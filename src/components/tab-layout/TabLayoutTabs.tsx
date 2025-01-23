import { memo, useContext, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { useMemoizedFn } from 'ahooks'
import { twJoin } from 'tailwind-merge'
import { ITab, ITabMeta } from './types'
import { useSyncTabs } from './hooks/use-sync-tabs'
import { InternalContext, TabsContext } from './context/internal'
import { getCloseBlocker } from './close-blocker'

export default function TabLayoutTabs() {
  const navigate = useNavigate()
  const location = useLocation()

  const { tabMetaMap, aliveRef } = useContext(InternalContext)
  const { tabs, setTabs } = useContext(TabsContext)

  const activeTab = useMemo(
    () => tabs.find((tab) => tab.pathname === location.pathname),
    [location.pathname, tabs]
  )

  // sync tabs state with router's location
  useSyncTabs(setTabs, tabMetaMap)

  const closeTab = useMemoizedFn(async (pathname: string) => {
    // if this tab has a blocker, leave only when blocker returns `false`
    const blocker = getCloseBlocker(pathname)
    if (blocker) {
      const result = await blocker()
      if (result) return
    }

    const newTabs = tabs.filter((tab) => tab.pathname !== pathname)
    setTabs(newTabs)

    // * destroy the tab's page content
    aliveRef.current?.destroy(pathname)

    // if closing active tab, activate the last tab
    // we have default tabs, so last tab must exist
    if (activeTab?.pathname === pathname) {
      const lastTab = newTabs.at(-1)
      if (lastTab) {
        navigate(lastTab.href)
      }
    }
  })

  ////
  // Tab
  ////
  const tabOnActivate: TabProps['onActivate'] = useMemoizedFn((tab) => {
    navigate(tab.href)
  })
  const tabOnClose: TabProps['onClose'] = useMemoizedFn((tab) => {
    closeTab(tab.pathname)
  })

  return (
    <div className="flex">
      {tabs.map((tab) => (
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
  tab: ITab
  active: boolean
  onActivate: (tab: ITab) => void
  onClose: (tab: ITab) => void
} & ITabMeta
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
      <div className="flex-1 truncate">{props.tab.label ?? props.label}</div>

      {props.closable && (
        <div className="ml-1" onClick={() => props.onClose(props.tab)}>
          x
        </div>
      )}
    </div>
  )
}
const MemoTab = memo(Tab)
