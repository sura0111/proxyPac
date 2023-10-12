import { PageName, Tab } from '@packages/popup/constants'
import browser from 'webextension-polyfill'

export const tabs = [Tab.switcher, Tab.settings]

export const tabsPages = {
  [Tab.switcher]: [PageName.index],
  [Tab.settings]: [PageName.settings, PageName.addPac, PageName.editPac],
}

export const tabNames = {
  [Tab.switcher]: browser.i18n.getMessage('tabSwitcher'),
  [Tab.settings]: browser.i18n.getMessage('tabSettings'),
}
