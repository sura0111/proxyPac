import browser from 'webextension-polyfill'

export const dictionary = {
  appName: browser.i18n.getMessage('appName'),
  appDescription: browser.i18n.getMessage('appDescription'),
  tabSwitcher: browser.i18n.getMessage('tabSwitcher'),
  tabSettings: browser.i18n.getMessage('tabSettings'),
  save: browser.i18n.getMessage('save'),
  cancel: browser.i18n.getMessage('cancel'),
  display: browser.i18n.getMessage('display'),
  sort: browser.i18n.getMessage('sort'),
  systemDefault: browser.i18n.getMessage('systemDefault'),
  light: browser.i18n.getMessage('light'),
  dark: browser.i18n.getMessage('dark'),
  system: browser.i18n.getMessage('system'),
  newPac: browser.i18n.getMessage('newPac'),
  url: browser.i18n.getMessage('url'),
  text: browser.i18n.getMessage('text'),
  displayAsIconTooltip: browser.i18n.getMessage('displayAsIconTooltip'),
  displayAsListTooltip: browser.i18n.getMessage('displayAsListTooltip'),
  sortByNone: browser.i18n.getMessage('sortByNone'),
  sortByRecent: browser.i18n.getMessage('sortByRecent'),
  sortByAlphabet: browser.i18n.getMessage('sortByAlphabet'),
}
