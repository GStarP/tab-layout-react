import { useState } from 'react'
import { useNavigate } from 'react-router'

import {
  TabLayoutOutlet,
  TabLayoutProvider,
  TabLayoutTabs,
} from '../../components/tab-layout'

const DEFAULT_TABS: React.ComponentProps<
  typeof TabLayoutProvider
>['defaultTabs'] = [
  {
    pathname: '/main',
    href: '/main',
  },
]
const TAB_METAS: React.ComponentProps<typeof TabLayoutProvider>['tabMetas'] = [
  {
    pathname: '/main',
    label: 'Welcome',
    closable: false,
    cacheable: false,
  },
  {
    pathname: '/main/form',
    label: 'Edit Form',
    closable: true,
    cacheable: true,
  },
]

export default function Main() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full">
      <TabLayoutProvider defaultTabs={DEFAULT_TABS} tabMetas={TAB_METAS}>
        <TabLayoutTabs />

        <div className="flex-1 flex border-t">
          <div className="border-r w-52">
            <button
              className="border w-full py-4"
              onClick={() => setCount((v) => v + 1)}
            >
              {count}
            </button>
            <div
              className="border-b py-4 hover:bg-black/5 hover:cursor-pointer w-full text-center"
              onClick={() =>
                navigate(`/main/form?key=${String(Math.random())}`)
              }
            >
              Edit Form
            </div>
          </div>

          <TabLayoutOutlet />
        </div>
      </TabLayoutProvider>
    </div>
  )
}
