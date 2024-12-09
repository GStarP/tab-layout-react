import TabLayout from './TabLayout'
import TabLayoutOutlet from './TabLayoutOutlet'
import { UseTabLayoutParams } from './type'

// use outside component, no rerender needed
export const staticUseTabLayout = (params: UseTabLayoutParams) => {
  const TabLayoutComponent = <TabLayout {...params} />
  const TabLayoutOutletComponent = <TabLayoutOutlet tabMeta={params.tabMeta} />

  return {
    TabLayoutComponent,
    TabLayoutOutletComponent,
  }
}
