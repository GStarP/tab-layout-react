import { memo, useMemo } from 'react'
import { ITab } from './types'
import { twJoin } from 'tailwind-merge'

type Props = {
  tabs: ITab[]
  activeTabKey: string
  onTabClick: (tab: ITab) => void
  onTabClose: (tabKey: string) => void
}

export default function TabLayoutTabs(props: Props) {
  const activeTab = useMemo(
    () => props.tabs.find((tab) => tab.key === props.activeTabKey),
    [props.activeTabKey, props.tabs]
  )

  return (
    <div className="flex border-b w-full overflow-x-auto tab-layout-tabs overflow-y-hidden">
      {props.tabs.map((tab) => (
        <MemoTab
          key={tab.key}
          tab={tab}
          active={tab === activeTab}
          onTabClick={props.onTabClick}
          onTabClose={props.onTabClose}
        />
      ))}
    </div>
  )
}

type TabProps = {
  tab: ITab
  active: boolean
} & Pick<Props, 'onTabClick' | 'onTabClose'>
function Tab(props: TabProps) {
  return (
    <div
      className={twJoin(
        'relative flex h-8 flex-shrink basis-32 select-none items-center overflow-hidden border-r px-2 hover:cursor-pointer hover:bg-slate-100 before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 min-w-16',
        props.active ? 'before:bg-blue-400' : undefined
      )}
      onClick={() => {
        if (props.active) return
        props.onTabClick(props.tab)
      }}
    >
      <div className="flex-1 truncate text-center">{props.tab.label}</div>

      {!props.tab.fixed && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="ml-1 size-4 rounded-full border-gray-500 text-gray-500 hover:border"
          onClick={(e) => {
            e.stopPropagation()
            props.onTabClose(props.tab.key)
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      )}
    </div>
  )
}
const MemoTab = memo(Tab)
