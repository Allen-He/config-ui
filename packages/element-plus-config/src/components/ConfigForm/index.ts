import { withInstall } from '@config-ui/shared'
import { default as ConfigFormRaw } from './ConfigForm.vue'

export * from './helper'

export const ConfigForm = withInstall(ConfigFormRaw)

export default ConfigForm
