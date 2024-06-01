export const adminNav = [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cilHome',
  },
  {
    component: 'CNavGroup',
    name: 'Users',
    to: '/buttons',
    icon: 'cilAddressBook',
    items: [
      {
        component: 'CNavItem',
        name: 'Coaches',
        to: '/pages/Coaches',
      },
      {
        component: 'CNavItem',
        name: 'Client',
        to: '/pages/Clients',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'My Profile',
    to: '/pages/my-profile',
    icon: 'cilTablet',
  },
  {
    component: 'CNavItem',
    name: 'Programs',
    to: '/pages/Programs',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavItem',
    name: 'Training Management',
    to: '/pages/trainings',
    icon: 'cilSpreadsheet',
  },
  {
    component: 'CNavItem',
    name: 'Trainer Schedules',
    to: '/pages/trainer-schedule',
    icon: 'cilAlarm',
  },
  {
    component: 'CNavItem',
    name: 'Client Progress',
    to: '/pages/client-progress',
    icon: 'cilChartLine',
  },
  {
    component: 'CNavItem',
    name: 'Logout',
    to: '/pages/logout',
    icon: 'cilAccountLogout',
    onClick: 'handleLogout' 
  }
];

export const personalTrainerNav = [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cilHome',
  },
  {
    component: 'CNavItem',
    name: 'My Profile',
    to: '/pages/my-profile',
    icon: 'cilTablet',
  },
  {
    component: 'CNavItem',
    name: 'Training Management',
    to: '/pages/trainings',
    icon: 'cilSpreadsheet',
  },
  {
    component: 'CNavItem',
    name: 'Trainer Schedules',
    to: '/pages/trainer-schedule',
    icon: 'cilAlarm',
  },
  {
    component: 'CNavItem',
    name: 'Client Progress',
    to: '/pages/client-progress',
    icon: 'cilChartLine',
  },
  {
    component: 'CNavItem',
    name: 'Logout',
    to: '/pages/logout',
    icon: 'cilAccountLogout',
    onClick: 'handleLogout' 
  }
];

export const clientNav = [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cilHome',
  },
  {
    component: 'CNavItem',
    name: 'My Profile',
    to: '/pages/my-profile',
    icon: 'cilTablet',
  },
  {
    component: 'CNavItem',
    name: 'My Schedules',
    to: '/pages/my-schedule',
    icon: 'cilAlarm',
  },
  {
    component: 'CNavItem',
    name: 'My Progress',
    to: '/pages/my-progress',
    icon: 'cilChartLine',
  },
  {
    component: 'CNavItem',
    name: 'Logout',
    to: '/pages/logout',
    icon: 'cilAccountLogout',
    onClick: 'handleLogout' 
  }
];
