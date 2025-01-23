import { createContext, useContext } from 'react'

type TabLayoutContext = {
  useTabLabel: (label?: string) => void
}

export const ExportContext = createContext<TabLayoutContext>({
  useTabLabel: () => {},
})

export const useTabLayoutContext = () => useContext(ExportContext)
