<template>
  <div id="app">
    <router-view v-if="$route.meta.show"></router-view>
    <keep-alive v-else>
      <router-view></router-view>
    </keep-alive>


    <div class="nav" v-if="$route.path=='/msite' || $route.path=='/search' || $route.path=='/order' || $route.path=='/profile '">
      <router-link to="/msite" tag="div" class="nav_ele">
        <img src="../static/eleme.svg" alt="" v-if="$route.path=='/msite'">
        <img src="../static/eleme1.svg" alt="" v-else>
        <div>外卖</div>
      </router-link>
      <router-link to="/search" tag="div" class="nav_south">
        <img src="../static/south.svg" v-if="$route.path=='/search'">
        <img src="../static/south1.svg" v-else>
        <div>搜索</div>
      </router-link>
      <router-link to="/order" tag="div" class="nav_order">
        <img src="../static/order.png" alt="" v-if="$route.path=='/order'">
        <img src="../static/order1.png" alt="" v-else>
        <div>订单</div>
      </router-link>
      <router-link to="/profile" tag="div" class="nav_person">
        <img src="../static/person.svg" alt="" v-if="$route.path=='/profile'">
        <img src="../static/person1.svg" alt="" v-else>
        <div>我的</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import 'style/common.scss';
@import 'style/mixin.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.nav{
  position: fixed;
  bottom:-1px;
  @include flex;
  width: 100%;
  height:3rem;
  line-height: 3rem;
  font-size: .6rem;
  background-color: white;
  .nav_ele,.nav_south,.nav_order,.nav_person{
    width: 25%;
    height:100%;
    @include flex(space-around,column);
    align-items: center;
    div{
      height: 1rem;
      line-height: 1rem;
    }
    img{
      width: 1.1rem;
      height: 1.1rem;
    }
  }

}
</style>
