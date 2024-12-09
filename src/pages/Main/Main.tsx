import { useState } from 'react'
import { staticUseTabLayout } from '../../components/tab-layout'
import { UseTabLayoutParams } from '../../components/tab-layout/type'

const MainGlobal: {
  tabLayoutApi: UseTabLayoutParams['api']
} = {
  tabLayoutApi: {
    current: null,
  },
}
const DEFAULT_TABS = [
  {
    pathname: '/main',
    href: '/main',
  },
]
const TAB_META = [
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

const { TabLayoutComponent, TabLayoutOutletComponent } = staticUseTabLayout({
  api: MainGlobal.tabLayoutApi,
  defaultTabs: DEFAULT_TABS,
  tabMeta: TAB_META,
})

export default function Main() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col h-full">
      {TabLayoutComponent}
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
              MainGlobal.tabLayoutApi.current?.activateTab(
                `/main/form?key=${String(Math.random())}`
              )
            }
          >
            Edit Form
          </div>
        </div>
        {TabLayoutOutletComponent}
      </div>
    </div>
  )
}
