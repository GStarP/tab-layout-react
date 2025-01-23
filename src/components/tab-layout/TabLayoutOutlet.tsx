import { useContext, useMemo } from 'react'
import { useLocation } from 'react-router'
import { KeepAliveRouteOutlet } from 'keepalive-for-react'
import { InternalContext } from './context/internal'
import ExportContextProvider from './context/export/ExportContextProvider'

export default function TabLayoutOutlet() {
  const location = useLocation()
  const { tabMetaMap, aliveRef } = useContext(InternalContext)

  const cacheableKeys = useMemo(
    () =>
      Array.from(tabMetaMap.values())
        .filter((tab) => tab.cacheable)
        .map((tab) => tab.pathname),
    [tabMetaMap]
  )

  return (
    <ExportContextProvider>
      <KeepAliveRouteOutlet
        aliveRef={aliveRef}
        activeCacheKey={location.pathname}
        include={cacheableKeys}
      ></KeepAliveRouteOutlet>
    </ExportContextProvider>
  )
}
