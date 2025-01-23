import { createContext } from 'react'
import { useKeepAliveRef } from 'keepalive-for-react'
import { ITab, ITabMeta } from '../../types'

export type ITabsContext = {
  tabs: ITab[]
  setTabs: React.Dispatch<React.SetStateAction<ITab[]>>
}
export const TabsContext = createContext<ITabsContext>({
  tabs: [],
  setTabs: () => {},
})

export type IInternalContext = {
  tabMetaMap: Map<string, ITabMeta>
  aliveRef: ReturnType<typeof useKeepAliveRef>
}

export const InternalContext = createContext<IInternalContext>({
  tabMetaMap: new Map(),
  aliveRef: {
    current: undefined,
  },
})
