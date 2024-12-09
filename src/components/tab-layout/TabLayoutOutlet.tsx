import { useMemo } from 'react'
import { useLocation } from 'react-router'
import { KeepAliveRouteOutlet, useKeepAliveRef } from 'keepalive-for-react'
import { TabLayoutOutletProps } from './type'

export default function TabLayoutOutlet(props: TabLayoutOutletProps) {
  const location = useLocation()
  const aliveRef = useKeepAliveRef()

  const cacheableTabPathnames = useMemo(
    () =>
      props.tabMeta.filter((tab) => tab.cacheable).map((tab) => tab.pathname),
    [props.tabMeta]
  )

  return (
    <KeepAliveRouteOutlet
      aliveRef={aliveRef}
      activeCacheKey={location.pathname}
      include={cacheableTabPathnames}
    ></KeepAliveRouteOutlet>
  )
}
