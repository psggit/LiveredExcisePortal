export const menuItems = [
  { label: 'Overview', value: 'overview', icon: 'overview' },
  { label: 'Live Orders', value: 'live-orders', icon: 'live-orders' },
  { label: 'Past Orders', value: 'past-orders', icon: 'past-orders' },
  { label: 'Rule Engine', value: 'rule-engine', icon: 'rule-engine' },
  { label: 'Retailers', value: 'retailers', icon: 'retailers' },
  { label: 'Delivery Operators', value: 'delivery-operators', icon: 'delivery-operators' },
  { label: 'Consumers', value: 'consumers', icon: 'consumers' },
  // { label: 'Reports', value: 'reports', icon: 'reports' }
]

export const menuItemsMap = menuItems.reduce((menuItemsMap, item) => {
  menuItemsMap[item.value] = item.label
  return menuItemsMap
}, {})
