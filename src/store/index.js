
// import getters from './getters.js'

const state = {
  geohash	: JSON.parse(localStorage.getItem('geohash')) || '',
  order  	: JSON.parse(localStorage.getItem('order')) || {},     // order = { $1:[{},{},{}] ,$2:[{},{}] }
  isLogin	: sessionStorage.getItem('login') || false,
  restaurant: JSON.parse(localStorage.getItem('restaurant')) || {},
  userId    : localStorage.getItem('userid') || '', 
};

export default new Vuex.Store({
  state
});

