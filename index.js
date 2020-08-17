import Vue from 'vue';
import store from '@src/store';
import router from '@src/router';
import App from '@src/App';

Vue.config.productionTip = false;

new Vue({
  el: '#root',
  store,
  router,
  template: '<App/>',
  components: { App },
});
