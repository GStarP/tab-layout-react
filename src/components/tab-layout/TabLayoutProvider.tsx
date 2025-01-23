import { ITab, ITabMeta } from './types'

import { useMemo, useState } from 'react'
import { useKeepAliveRef } from 'keepalive-for-react'
import { InternalContext, TabsContext } from './context/internal'

type Props = {
  children: React.ReactNode
  tabMetas: ITabMeta[]
  defaultTabs: ITab[]
}
export default function TabLayoutProvider(props: Props) {
  const tabMetaMap = useMemo(() => {
    const map = new Map<string, ITabMeta>()
    props.tabMetas.forEach((tabMeta) => {
      map.set(tabMeta.pathname, tabMeta)
    })
    return map
  }, [props.tabMetas])
  const aliveRef = useKeepAliveRef()

  const [tabs, setTabs] = useState<ITab[]>(props.defaultTabs)

  return (
    <InternalContext.Provider
      value={{
        tabMetaMap,
        aliveRef,
      }}
    >
      <TabsContext.Provider
        value={{
          tabs,
          setTabs,
        }}
      >
        {props.children}
      </TabsContext.Provider>
    </InternalContext.Provider>
  )
}
