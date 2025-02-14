import {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  TabReactiveContext,
  TabStaticContext,
  TabLayoutContext,
} from './context'
import { ITab, TabLayoutAPI, TabLayoutProps } from './types'
import { useLocation, useNavigate } from 'react-router'
import { locationToHref, locationToTabKey } from './utils/location'
import { Tabs } from 'antd'
import { produce } from 'immer'
import TabLayoutTabs from './TabLayoutTabs'
import './index.css'

function TabLayoutProvider(props: PropsWithChildren<TabLayoutProps>) {
  const { createTab } = props

  const [tabs, setTabs] = useState<ITab[]>(props.defaultTabs || [])

  const location = useLocation()

  const activeTabKey = useMemo(() => locationToTabKey(location), [location])

  const _createOrUpdateTab = useCallback(
    (
      _location: { pathname: string; search: string },
      payload?: Partial<ITab>
    ) => {
      setTabs(
        produce((tabs) => {
          const activeTabKey = locationToTabKey(_location)
          const targetTab = tabs.find((tab) => tab.key === activeTabKey)
          const href = locationToHref(_location)
          if (targetTab) {
            targetTab.href = href
            if (payload) {
              Object.assign(targetTab, payload)
            }
          } else {
            const newTab = createTab(_location)
            if (newTab) {
              if (payload) {
                Object.assign(newTab, payload)
              }
              tabs.push({
                key: activeTabKey,
                href,
                ...newTab,
              })
            }
          }
        })
      )
    },
    [createTab, setTabs]
  )

  // sync tabs with router.location
  useEffect(() => {
    _createOrUpdateTab(location)
  }, [location, _createOrUpdateTab])

  const getTabs = useCallback<TabLayoutAPI['getTabs']>(() => tabs, [tabs])
  const updateTab = useCallback<TabLayoutAPI['updateTab']>(
    (key, payload) => {
      setTabs(
        produce((tabs) => {
          const targetTab = tabs.find((tab) => tab.key === key)
          if (targetTab) {
            Object.assign(targetTab, payload)
          }
        })
      )
    },
    [setTabs]
  )

  const navigate = useNavigate()
  const closeTab = useCallback<TabLayoutAPI['closeTab']>(
    async (key) => {
      const targetTab = tabs.find((tab) => tab.key === key)
      if (targetTab && targetTab.closeBlocker) {
        const shouldBlock = await targetTab.closeBlocker()
        if (shouldBlock) return false
      }

      setTabs(
        produce((tabs) => {
          const filteredTabs = tabs.filter((tab) => tab.key !== key)
          const isDeleteActive = activeTabKey === key
          if (isDeleteActive) {
            const lastTab = filteredTabs.at(-1)
            if (lastTab) {
              navigate(lastTab.href)
            }
          }

          return filteredTabs
        })
      )
      return true
    },
    [activeTabKey, tabs, navigate, setTabs]
  )

  useEffect(() => {
    props.apiRef.current = {
      getTabs,
      updateTab,
      closeTab,
    }
  }, [props.apiRef, getTabs, closeTab, updateTab])

  return (
    <TabLayoutContext.Provider
      value={{ tabs, setTabs, activeTabKey, closeTab }}
    >
      {props.children}
    </TabLayoutContext.Provider>
  )
}

function TabStaticContextProvider(
  props: React.PropsWithChildren<{
    tabKey: string
    scope?: React.ComponentProps<
      typeof TabStaticContext.Provider
    >['value']['scope']
  }>
) {
  const scopeRef = useRef(props.scope || {})
  return (
    <TabStaticContext.Provider
      value={{
        tabKey: props.tabKey,
        scope: scopeRef.current,
      }}
    >
      {props.children}
    </TabStaticContext.Provider>
  )
}

function TabLayoutBox() {
  const { tabs, activeTabKey, closeTab } = useContext(TabLayoutContext)
  const navigate = useNavigate()
  const onTabClick = (tab: ITab) => {
    navigate(tab.href)
  }

  return (
    <Tabs
      className="w-full overflow-hidden"
      activeKey={activeTabKey}
      items={tabs.map((tab) => ({
        key: tab.key,
        label: tab.label,
        children: (
          <TabStaticContextProvider
            tabKey={tab.key}
            scope={tab.createScope?.()}
          >
            <TabReactiveContext.Provider
              value={{
                tab,
                isActive: tab.key === activeTabKey,
              }}
            >
              {tab.children}
            </TabReactiveContext.Provider>
          </TabStaticContextProvider>
        ),
      }))}
      renderTabBar={() => (
        <TabLayoutTabs
          tabs={tabs}
          activeTabKey={activeTabKey}
          onTabClick={onTabClick}
          onTabClose={closeTab}
        />
      )}
    ></Tabs>
  )
}

export default function TabLayout(props: TabLayoutProps) {
  return (
    <TabLayoutProvider {...props}>
      <TabLayoutBox />
    </TabLayoutProvider>
  )
}
