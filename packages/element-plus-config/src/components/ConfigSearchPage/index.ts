import { withInstall } from '@config-ui/shared'
import { default as ConfigSearchPageRaw } from './ConfigSearchPage.vue'

export * from './helper'

export const ConfigSearchPage = withInstall(ConfigSearchPageRaw)

export default ConfigSearchPage
