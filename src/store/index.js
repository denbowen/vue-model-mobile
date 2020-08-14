import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import modules from './modules';

const { Store } = Vuex;
Vue.use(Vuex);

// 导出Store的实例
export default new Store({
  state, // 数据源
  getters, // 可以对数据源进行二次处理
  actions, // 用于触发mutations中函数来修改state中的数据, 主要用于弥补mutations不能编写异步代码的问题
  mutations, // 用于修改数据源中的数据
  modules, // 里面的modules
});
