export type ITabMeta = {
  // pathname serves as key
  pathname: string
  label: string
  closable: boolean
  cacheable: boolean
}

export type ITab = {
  pathname: string
  // the complete href, like {pathname}?{search}#{hash}
  href: string
  // one tab may show variable of names
  label?: string
}

export type TabLayoutCloseBlocker = () => Promise<boolean>
