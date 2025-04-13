import type { App } from 'vue'
import packageJson from '../package.json'
import HelloWorld from './components/HelloWorld'

export default {
  install(app: App) {
    app.use(HelloWorld)
  },
  version: packageJson.version,
}
