import { createContext, useContext } from 'react'
import { ITab, TabLayoutAPI } from './types'

type ITabLayoutContext = {
  tabs: ITab[]
  setTabs: React.Dispatch<React.SetStateAction<ITab[]>>
  activeTabKey: string
} & Pick<TabLayoutAPI, 'closeTab'>

export const TabLayoutContext = createContext<ITabLayoutContext>({
  tabs: [],
  setTabs: () => {},
  activeTabKey: '',
  closeTab: () => Promise.resolve(true),
})

type ITabReactiveContext = {
  tab: ITab
  isActive: boolean
}
export const TabReactiveContext = createContext<ITabReactiveContext>({
  tab: {} as ITab,
  isActive: false,
})
export const useTabReactive = (): ITabReactiveContext =>
  useContext(TabReactiveContext)

type ITabStaticContext = {
  tabKey: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scope: Record<string, any>
}
export const TabStaticContext = createContext<ITabStaticContext>({
  tabKey: '',
  scope: {},
})
export const useTabStatic = (): ITabStaticContext =>
  useContext(TabStaticContext)
