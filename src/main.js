import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import store from './store'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsExample from '@/components/DocsExample'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "ag-grid-community/styles/ag-theme-quartz.css";

import '../axios';

const app = createApp(App)
const pinia = createPinia();

app.use(pinia)
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(VueSweetalert2);
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsExample', DocsExample)

app.mount('#app')
