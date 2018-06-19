export const menuItems = [
  { value: 'live-orders', label: 'In Progress OTTP' },
  { value: 'history-orders', label: 'OTTP History' },
  { value: 'user-management', label: 'User Management' },
  // { value: 'all', label: 'All orders' }
]

export const menuItemsMap = menuItems.reduce((menuItemsMap, item) => {
  menuItemsMap[item.value] = item.label
  return menuItemsMap
}, {})
