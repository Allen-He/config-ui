import { withInstall } from '@config-ui/shared'
import { default as ConfigSearchPageRaw } from './ConfigSearchPage.vue'
import ConfigFilter from './components/ConfigFilter.vue'
import ConfigTable from './components/ConfigTable.vue'

export * from './helper'

export const ConfigSearchPage = withInstall(ConfigSearchPageRaw, { ConfigFilter, ConfigTable })

export default ConfigSearchPage
