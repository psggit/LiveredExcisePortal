export const menuItems = [
  { value: 'live-view', label: 'Live View' },
  { value: 'live-ottp', label: 'In Progress OTTP' },
  { value: 'dso', label: 'DSO' },
  { value: 'rule-management', label: 'Rule Management' },
  { value: 'retailers', label: 'Retailers' },
  { value: 'geofences', label: 'Jurisdictions' },
  { value: 'history-ottp', label: 'OTTP History' },
  { value: 'user-management', label: 'User Management' },
  // { value: 'all', label: 'All orders' }
]

export const menuItemsMap = menuItems.reduce((menuItemsMap, item) => {
  menuItemsMap[item.value] = item.label
  return menuItemsMap
}, {})
