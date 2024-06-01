import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/Dashboard.vue'
          ),
      },
      {
        path: '/theme',
        name: 'Theme',
        redirect: '/theme/typography',
      },
      {
        path: '/theme/colors',
        name: 'Colors',
        component: () => import('@/views/theme/Colors.vue'),
      },
      {
        path: '/theme/typography',
        name: 'Typography',
        component: () => import('@/views/theme/Typography.vue'),
      },
      {
        path: '/pages/coaches',
        name: 'Coaches',
        component: () => import('@/views/pages/Coaches/Coaches.vue'),
      },
      {
        path: '/pages/add-coaches',
        name: 'add-coaches',
        component: () => import('@/views/pages/Coaches/AddCoaches.vue'),
      },
      {
        path: '/pages/edit-coaches/:id',
        name: 'edit-coaches',
        component: () => import('@/views/pages/Coaches/EditCoaches.vue'),
      },


      {
        path: '/pages/clients',
        name: 'Clients',
        component: () => import('@/views/pages/Clients/Clients.vue'),
      },
      {
        path: '/pages/add-clients',
        name: 'add-clients',
        component: () => import('@/views/pages/Clients/AddClients.vue'),
      },
      {
        path: '/pages/edit-clients/:id',
        name: 'edit-clients',
        component: () => import('@/views/pages/Clients/EditClients.vue'),
      },

      
      {
        path: '/pages/users',
        name: 'Users',
        component: () => import('@/views/pages/Users/Users.vue'),
      },
      {
        path: '/pages/add-user',
        name: 'add-user',
        component: () => import('@/views/pages/Users/AddUsers.vue'),
      },
      {
        path: '/pages/edit-user/:id',
        name: 'edit-user',
        component: () => import('@/views/pages/Users/EditUsers.vue'),
      },
      {
        path: '/pages/programs',
        name: 'Programs',
        component: () => import('@/views/pages/Programs/Programs.vue'),
      },
      {
        path: '/pages/trainings',
        name: 'Trainings',
        component: () => import('@/views/pages/Trainings/Trainings.vue'),
      },

      {
        path: '/pages/add-trainings',
        name: 'Add Training',
        component: () => import('@/views/pages/Trainings/AddSchedule.vue'),
      },

      {
        path: '/pages/edit-trainings/:id',
        name: 'Edit Training',
        component: () => import('@/views/pages/Trainings/EditSchedule.vue'),
      },
      {
        path: '/pages/my-profile',
        name: 'My Profile',
        component: () => import('@/views/pages/Profiles/Profiles.vue'),
      },
      {
        path: '/pages/trainer-schedule',
        name: 'Trainer Schedule',
        component: () => import('@/views/pages/Schedules/TrainerSchedule.vue'),
      },
      {
        path: '/pages/my-schedule',
        name: 'My Schedule',
        component: () => import('@/views/pages/Schedules/MySchedule.vue'),
      },
      {
        path: '/pages/client-progress',
        name: 'Client Progress',
        component: () => import('@/views/pages/Progress/ClientProgress.vue'),
      },
      {
        path: '/pages/input-progress/:id',
        name: 'Input Progress',
        component: () => import('@/views/pages/Progress/InputProgress.vue'),
      },
      {
        path: '/pages/my-progress',
        name: 'My Progress',
        component: () => import('@/views/pages/Progress/MyProgress.vue'),
      },

      // {
      //   path: '/pages/users',
      //   name: 'Users',
      //   component: {
      //     render() {
      //       return h(resolveComponent('router-view'))
      //     },
      //   },
      //   redirect: '/pages/users',
      //   children: [
      //     {
      //       path: '/pages/add-user',
      //       name: 'add-user',
      //       component: () => import('@/views/pages/Users/AddUsers.vue'),
      //     },
      //   ]
      // },
      {
        path: '/base',
        name: 'Base',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/base/breadcrumbs',
        children: [
          {
            path: '/base/accordion',
            name: 'Accordion',
            component: () => import('@/views/base/Accordion.vue'),
          },
          {
            path: '/base/breadcrumbs',
            name: 'Breadcrumbs',
            component: () => import('@/views/base/Breadcrumbs.vue'),
          },
          {
            path: '/base/cards',
            name: 'Cards',
            component: () => import('@/views/base/Cards.vue'),
          },
          {
            path: '/base/carousels',
            name: 'Carousels',
            component: () => import('@/views/base/Carousels.vue'),
          },
          {
            path: '/base/collapses',
            name: 'Collapses',
            component: () => import('@/views/base/Collapses.vue'),
          },
          {
            path: '/base/list-groups',
            name: 'List Groups',
            component: () => import('@/views/base/ListGroups.vue'),
          },
          {
            path: '/base/navs',
            name: 'Navs',
            component: () => import('@/views/base/Navs.vue'),
          },
          {
            path: '/base/paginations',
            name: 'Paginations',
            component: () => import('@/views/base/Paginations.vue'),
          },
          {
            path: '/base/placeholders',
            name: 'Placeholders',
            component: () => import('@/views/base/Placeholders.vue'),
          },
          {
            path: '/base/popovers',
            name: 'Popovers',
            component: () => import('@/views/base/Popovers.vue'),
          },
          {
            path: '/base/progress',
            name: 'Progress',
            component: () => import('@/views/base/Progress.vue'),
          },
          {
            path: '/base/spinners',
            name: 'Spinners',
            component: () => import('@/views/base/Spinners.vue'),
          },
          {
            path: '/base/tables',
            name: 'Tables',
            component: () => import('@/views/base/Tables.vue'),
          },
          {
            path: '/base/tooltips',
            name: 'Tooltips',
            component: () => import('@/views/base/Tooltips.vue'),
          },
        ],
      },
      {
        path: '/buttons',
        name: 'Buttons',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/buttons/standard-buttons',
        children: [
          {
            path: '/buttons/standard-buttons',
            name: 'Buttons',
            component: () => import('@/views/buttons/Buttons.vue'),
          },
          {
            path: '/buttons/dropdowns',
            name: 'Dropdowns',
            component: () => import('@/views/buttons/Dropdowns.vue'),
          },
          {
            path: '/buttons/button-groups',
            name: 'Button Groups',
            component: () => import('@/views/buttons/ButtonGroups.vue'),
          },
        ],
      },
      {
        path: '/forms',
        name: 'Forms',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/forms/form-control',
        children: [
          {
            path: '/forms/form-control',
            name: 'Form Control',
            component: () => import('@/views/forms/FormControl.vue'),
          },
          {
            path: '/forms/select',
            name: 'Select',
            component: () => import('@/views/forms/Select.vue'),
          },
          {
            path: '/forms/checks-radios',
            name: 'Checks & Radios',
            component: () => import('@/views/forms/ChecksRadios.vue'),
          },
          {
            path: '/forms/range',
            name: 'Range',
            component: () => import('@/views/forms/Range.vue'),
          },
          {
            path: '/forms/input-group',
            name: 'Input Group',
            component: () => import('@/views/forms/InputGroup.vue'),
          },
          {
            path: '/forms/floating-labels',
            name: 'Floating Labels',
            component: () => import('@/views/forms/FloatingLabels.vue'),
          },
          {
            path: '/forms/layout',
            name: 'Layout',
            component: () => import('@/views/forms/Layout.vue'),
          },
          {
            path: '/forms/validation',
            name: 'Validation',
            component: () => import('@/views/forms/Validation.vue'),
          },
        ],
      },
      {
        path: '/charts',
        name: 'Charts',
        component: () => import('@/views/charts/Charts.vue'),
      },
      {
        path: '/icons',
        name: 'Icons',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/icons/coreui-icons',
        children: [
          {
            path: '/icons/coreui-icons',
            name: 'CoreUI Icons',
            component: () => import('@/views/icons/CoreUIIcons.vue'),
          },
          {
            path: '/icons/brands',
            name: 'Brands',
            component: () => import('@/views/icons/Brands.vue'),
          },
          {
            path: '/icons/flags',
            name: 'Flags',
            component: () => import('@/views/icons/Flags.vue'),
          },
        ],
      },
      {
        path: '/notifications',
        name: 'Notifications',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/notifications/alerts',
        children: [
          {
            path: '/notifications/alerts',
            name: 'Alerts',
            component: () => import('@/views/notifications/Alerts.vue'),
          },
          {
            path: '/notifications/badges',
            name: 'Badges',
            component: () => import('@/views/notifications/Badges.vue'),
          },
          {
            path: '/notifications/modals',
            name: 'Modals',
            component: () => import('@/views/notifications/Modals.vue'),
          },
          {
            path: '/notifications/toasts',
            name: 'Toasts',
            component: () => import('@/views/notifications/Toasts.vue'),
          },
        ],
      },
      {
        path: '/widgets',
        name: 'Widgets',
        component: () => import('@/views/widgets/Widgets.vue'),
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
      {
        path: 'logout',
        name: 'Logout',
        component: () => import('@/views/pages/Logout'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
