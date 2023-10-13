import { PageName, Tab, dictionary } from '@packages/popup/constants'

export const tabs = [Tab.switcher, Tab.settings]

export const tabsPages = {
  [Tab.switcher]: [PageName.index],
  [Tab.settings]: [PageName.settings, PageName.addPac, PageName.editPac],
}

export const tabNames = {
  [Tab.switcher]: dictionary.tabSwitcher,
  [Tab.settings]: dictionary.tabSettings,
}
