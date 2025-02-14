import { TabLayout, TabLayoutProps } from '../../components/tab-layout'
import Welcome from './Welcome/Welcome'
import { TabLayoutApiRef } from '../../global'
import Form from './Form/Form'
import Left from './Left'
import { createFormScope } from './Form/scope'

const CREATE_TAB_FUNCTION: TabLayoutProps['createTab'] = (location) => {
  switch (location.pathname) {
    case '/welcome':
      return {
        label: 'Welcome!',
        children: <Welcome />,
        fixed: true,
      }
    case '/form':
      return {
        label: 'Form',
        children: <Form />,
        createScope: createFormScope,
      }
    default:
      return undefined
  }
}

const DEFAULT_TABS: TabLayoutProps['defaultTabs'] = [
  {
    key: '/welcome',
    href: '/welcome',
    ...CREATE_TAB_FUNCTION({ pathname: '/welcome', search: '' })!,
  },
]

export default function Main() {
  return (
    <div className="flex-1 flex border-t h-full">
      <Left />
      <TabLayout
        apiRef={TabLayoutApiRef}
        createTab={CREATE_TAB_FUNCTION}
        defaultTabs={DEFAULT_TABS}
      />
    </div>
  )
}
