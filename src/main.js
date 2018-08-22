import App from './App'
import router from './router'
import 'vue-swipe/dist/vue-swipe.css'
import { Swipe, SwipeItem } from 'vue-swipe'
import store from './store'
import Loading from './plugins/loading'
import messageBox from './plugins/messageBox'
import VueLazyLoad from 'vue-lazyload'

axios.defaults.withCredentials = true; // 携带cookie
Vue.use(Loading);
Vue.use(messageBox);
Vue.use(VueLazyLoad,{
    error:'./static/error.png',
    loading:'./static/loading2.gif'
})

Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

let vm = new Vue({
  el		: '#app',
  template  : '<App/>',
  components: { App },
  router,
  store
});

export default{
	vm
}
