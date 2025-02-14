import { ILocation } from '../types'

export const locationToTabKey = (location: ILocation): string => {
  const { pathname, search } = location
  if (search) {
    const searchParams = new URLSearchParams(search)
    const tabKey = searchParams.get('tabKey')
    if (tabKey) {
      return `${pathname}?${tabKey}`
    }
  }
  return pathname
}

export const locationToHref = (location: ILocation) => {
  const { pathname, search } = location
  return `${pathname}${search}`
}

export const hrefToLocation = (href: string): ILocation => {
  const [pathname, _search] = href.split('?')
  return {
    pathname,
    search: `?${_search}`,
  }
}
