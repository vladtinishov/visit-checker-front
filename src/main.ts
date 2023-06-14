
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// @ts-ignore
import App from './App.vue'
import router from './router'

const app = createApp(App)
import './index.css'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { OhVueIcon, addIcons } from "oh-vue-icons";

import * as FaIcons from "oh-vue-icons/icons/fa";
import {CoClock, CoCalendar } from "oh-vue-icons/icons";

addIcons(CoClock, CoCalendar );

app.component("v-icon", OhVueIcon);
app.component('VueDatePicker', VueDatePicker);
app.use(createPinia())
app.use(router)

app.mount('#app')
