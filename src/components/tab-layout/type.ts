import { MutableRefObject } from 'react'

export type UseTabLayoutParams = TabLayoutProps

export type TabLayoutTabMeta = {
  pathname: string
  label: string
  closable: boolean
  cacheable: boolean
}

export type TabLayoutTab = {
  // one pathname => one tab (also serve as id)
  pathname: string
  // the complete href, may be {pathname}?{search}#{hash}
  href: string
}

export type TabLayoutApi = {
  activateTab: (path: string) => void
}

export type TabLayoutProps = {
  api: MutableRefObject<TabLayoutApi | null>
  defaultTabs: TabLayoutTab[]
  tabMeta: TabLayoutTabMeta[]
}

export type TabLayoutOutletProps = Pick<TabLayoutProps, 'tabMeta'>
