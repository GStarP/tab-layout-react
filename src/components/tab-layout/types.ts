import { ReactNode } from 'react'

export type ILocation = {
  pathname: string
  search: string
}

export type ITab = {
  key: string
  href: string
  label: string
  fixed?: boolean
  children: ReactNode
  closeBlocker?: () => Promise<boolean>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createScope?: () => Record<string, any>
}

export type TabLayoutAPI = {
  getTabs: () => ITab[]
  updateTab(tabKey: string, tab: Partial<ITab>): void
  closeTab(tabKey: string): Promise<boolean>
}

export type TabLayoutProps = {
  apiRef: { current: TabLayoutAPI | undefined }
  createTab: (location: {
    pathname: string
    search: string
  }) => Omit<ITab, 'key' | 'href'> | undefined
  defaultTabs?: ITab[]
}
