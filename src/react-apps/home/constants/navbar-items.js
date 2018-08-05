export const menuItems = [
  { value: 'birds-eye-view', label: 'Birds Eye View' },
  { value: 'dso', label: 'DSO' },
  { value: 'rule-management', label: 'Rule Management' },
  { value: 'retailers', label: 'Retailers' },
  { value: 'geofences', label: 'Geofences' },
  { value: 'live-ottp', label: 'In Progress OTTP' },
  { value: 'history-ottp', label: 'OTTP History' },
  { value: 'user-management', label: 'User Management' },
  // { value: 'all', label: 'All orders' }
]

export const menuItemsMap = menuItems.reduce((menuItemsMap, item) => {
  menuItemsMap[item.value] = item.label
  return menuItemsMap
}, {})
