/**
 * extract pathname
 * @param href url after host part
 * @returns url.pathname part
 */
export const hrefToPathname = (href: string): string => {
  for (let i = 0; i < href.length; i++) {
    if (href[i] === '?') {
      return href.slice(0, i)
    }
  }
  // remove trailing slash
  if (href[href.length - 1] === '/') {
    return href.slice(0, href.length - 1)
  }
  return href
}

export const parseValidHref = (location: Location): string => {
  return location.pathname + location.search + location.hash
}
