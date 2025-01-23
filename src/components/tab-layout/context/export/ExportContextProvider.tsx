import { useContext } from 'react'
import { ExportContext } from '.'
import { TabsContext } from '../internal'
import { useEffectOnActive } from 'keepalive-for-react'
import { produce } from 'immer'

export default function ExportContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ExportContext.Provider value={{ useTabLabel }}>
      {children}
    </ExportContext.Provider>
  )
}

const useTabLabel = (label?: string) => {
  const { setTabs } = useContext(TabsContext)

  useEffectOnActive(() => {
    setTabs(
      produce((tabs) => {
        const targetTab = tabs.find((tab) => tab.pathname === location.pathname)
        if (targetTab && targetTab.label !== label) {
          targetTab.label = label
        }
        return tabs
      })
    )
  }, [label])
}
