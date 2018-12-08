export const menuItems = [
  // { value: 'live-view', label: 'Live View' },
  { value: 'live-ottp', label: 'In Progress OTTP' },
  { value: 'history-ottp', label: 'OTTP History' },
  // { value: 'dso', label: 'DSO' },
  // { value: 'geofences', label: 'Jurisdictions' },
  // { value: 'user-management', label: 'User Management' },
  { value: 'rule-management', label: 'Rule Management' },
  // { value: 'all', label: 'All orders' }
]

export const menuItemsMap = menuItems.reduce((menuItemsMap, item) => {
  menuItemsMap[item.value] = item.label
  return menuItemsMap
}, {})
