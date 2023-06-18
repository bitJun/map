import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from '@/routes';
import '@/assets/style/global.css';
import BaiduMap from 'vue-baidu-map-3x'

const app = createApp(App);
app
  .use(router)
  .use(Antd)
  .use(BaiduMap, {
    ak: 'iinuIDyhGxeAk7IInis4gcNrhtYo29re',
    type: 'API'
  })
  .mount('#app');
