import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'
const { version } = packageJson

export default defineManifest(async () => {
  const [major, minor, patch, label = '0'] = version.replace(/[^\d.-]+/g, '').split(/[.-]/)

  return {
    manifest_version: 3,
    name: '__MSG_appName__',
    description: '__MSG_appDescription__',
    version: `${major}.${minor}.${patch}.${label}`,
    version_name: version,
    default_locale: 'en',
    permissions: ['storage', 'proxy'],
    host_permissions: ['*://*/*'],
    icons: {
      '16': 'public/icons/white16.png',
      '32': 'public/icons/white32.png',
      '128': 'public/icons/white128.png',
    },
    action: {
      default_popup: 'popup.html',
      default_title: '__MSG_appName__',
      default_icon: {
        '16': 'public/icons/white16.png',
        '32': 'public/icons/white32.png',
        '128': 'public/icons/white128.png',
      },
    },
    background: {
      service_worker: 'packages/background/serviceWorker.ts',
    },
  }
})
