const home     = resolve=> require(['../page/home.vue']   , resolve)
const city     = resolve=> require(['../page/city.vue']   , resolve)
const msite    = resolve=> require(['../page/msite.vue']  , resolve)
const search   = resolve=> require(['../page/search.vue'] , resolve)
const order    = resolve=> require(['../page/order.vue']  , resolve)
const profile  = resolve=> require(['../page/profile.vue'], resolve)
const shop     = resolve=> require(['../page/shop.vue']   , resolve)
const login    = resolve=> require(['../page/login.vue']  , resolve)
const food     = resolve=> require(['../page/food.vue']   , resolve)
const confirm  = resolve=> require(['../page/confirm.vue'], resolve)
const address  = resolve=> require(['../page/address.vue'], resolve)
const add      = resolve=> require(['../page/add.vue']    , resolve)
const remark   = resolve=> require(['../page/remark.vue'] , resolve)
const lazy     = resolve=> require(['../page/lazy.vue']   , resolve)



export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/city/:id',
      name: 'city',
      component: city
    },
    {
      path: '/msite',
      name: 'msite',
      component: msite
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop,
      meta : { show:true }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/food',
      name: 'food',
      component: food
    },
    {
      path: '/confirm',
      name: 'confirm',
      component:confirm
    },
    {
      path: '/address',
      name: 'address',
      component:address
    },
    {
      path: '/add',
      name: 'add',
      component:add
    },
    {
      path: '/remark',
      name: 'remark',
      component:remark
    },
    {
      path: '/lazy',
      name: 'lazy',
      component:lazy
    }
  ]
})
