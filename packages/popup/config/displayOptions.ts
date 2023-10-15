import { DisplayType, SortType, dictionary } from '@packages/popup/constants'

export const displayTypeConfigs = {
  [DisplayType.icon]: {
    type: DisplayType.icon,
    icon: 'mdi-format-columns',
    tooltip: dictionary.displayAsIconTooltip,
  },
  [DisplayType.list]: {
    type: DisplayType.list,
    icon: 'mdi-format-align-justify',
    tooltip: dictionary.displayAsListTooltip,
  },
}

export const sortTypeConfigs = {
  [SortType.default]: {
    type: SortType.default,
    icon: 'mdi-menu',
    tooltip: dictionary.sortByNone,
  },
  [SortType.recent]: {
    type: SortType.recent,
    icon: 'mdi-sort-clock-descending',
    tooltip: dictionary.sortByRecent,
  },
  [SortType.alphabetic]: {
    type: SortType.alphabetic,
    icon: 'mdi-sort-alphabetical-ascending',
    tooltip: dictionary.sortByAlphabet,
  },
}
