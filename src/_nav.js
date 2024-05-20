
export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavItem',
    name: 'Users',
    to: '/pages/Users',
    icon: 'cil-people',
  },
  {
    component: 'CNavItem',
    name: 'Coaches',
    to: '/pages/Coaches',
    icon: 'cil-user',
  },
  {
    component: 'CNavItem',
    name: 'Client',
    to: '/theme/typography',
    icon: 'cil-user',
  },
  
  {
    component: 'CNavItem',
    name: 'Training Sessions',
    to: '/theme/typography',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavItem',
    name: 'Attendance',
    to: '/theme/typography',
    icon: 'cil-check-circle',
  },
  {
    component: 'CNavItem',
    name: 'Report',
    to: '/theme/typography',
    icon: '',
  },
  {
    component: 'CNavItem',
    name: 'Account Setting',
    to: '/theme/typography',
    icon: '',
  },
  {
    component: 'CNavItem',
    name: 'Logout',
    to: '/pages/logout',
    icon: '',
    onClick: 'handleLogout' 
  }
  ,
  
]

