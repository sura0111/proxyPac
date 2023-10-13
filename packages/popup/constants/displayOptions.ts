export enum DisplayType {
  icon = 'icon',
  list = 'list',
}

export enum SortType {
  default = 'default',
  recent = 'recent',
  alphabetic = 'alphabetic',
}

export const displayTypeConfigs = {
  [DisplayType.icon]: {
    type: DisplayType.icon,
    icon: 'mdi-format-columns',
    tooltip: 'icon',
  },
  [DisplayType.list]: {
    type: DisplayType.list,
    icon: 'mdi-format-align-justify',
    tooltip: 'list',
  },
}

export const sortTypeConfigs = {
  [SortType.default]: {
    type: SortType.default,
    icon: 'mdi-menu',
    tooltip: 'default',
  },
  [SortType.recent]: {
    type: SortType.recent,
    icon: 'mdi-sort-clock-descending',
    tooltip: 'sort by last used',
  },
  [SortType.alphabetic]: {
    type: SortType.alphabetic,
    icon: 'mdi-sort-alphabetical-ascending',
    tooltip: 'sort alphabetically',
  },
}
