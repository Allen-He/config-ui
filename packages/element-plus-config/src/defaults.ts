import { App } from 'vue'
import packageJson from '../package.json'
import HelloWorld from './components/HelloWorld'
import ConfigForm from './components/ConfigForm'
import ConfigSearchPage from './components/ConfigSearchPage'

export default {
  install(app: App) {
    app.use(HelloWorld)
    app.use(ConfigForm)
    app.use(ConfigSearchPage)
  },
  version: packageJson.version,
}
