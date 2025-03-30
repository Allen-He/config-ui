import { App } from 'vue'
import packageJson from '../package.json'
import HelloWorld from './components/HelloWorld'
import ConfigForm from './components/ConfigForm'

export default {
  install(app: App) {
    app.use(HelloWorld)
    app.use(ConfigForm)
  },
  version: packageJson.version,
}
