<template>
  <div class="home">
    <heador class="header">
      <div slot="left" @click="$router.push('/lazy')">ele.me</div>
      <div slot="right" @click="$router.push('/login')">登录 | 注册</div>
    </heador>
    <!-- <header>
      <div @click="$router.go(0)">ele.me</div>
      <div @click="$router.push('/login')">登录 | 注册</div>
    </header> -->
      <div class="current">当前定位城市: <span>定位不准时,请在城市列表中选择</span></div>
      <div class="cCity" @click="$router.push({path:'/city/'+cCity.id.toString(), query:{name:cCity.name}})">
        <span>{{ cCity.name }}</span>
        <img src="../images/go.svg">
      </div>

    <div class="hot">
      <div class="hotCity">热门城市</div>
      <div class="cell" v-for="i in hCity" @click="$router.push({path:'/city/'+i.id.toString(), query:{name:i.name}})">
        {{ i.name }}
      </div>
    </div>
    <div class="gCity" v-for="g in gCity">
      <div v-for="(v,k) in g">
        <div class="title" v-if="k == 'A'">{{ k }} <span style="font-size: .6rem;color: grey;margin-left: .3rem;">(按字母排序)</span></div>
        <div class="title" v-else>{{ k }}</div>

        <div class="cell" v-for="city in g[k]" @click="$router.push({path:'/city/'+city.id.toString(), query:{name:city.name}})">
          {{ city.name }}
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import { currentCtiy, hotCity, groupCity } from '../service/getData';
  import heador from '../components/common/header.vue';
export default {
	data(){
		return {
			cCity : '',
      hCity : [],
      gCity : []
    }
  },
  activated(){
    currentCtiy.then((res)=>{
			this.cCity = res.data;
    });

    hotCity.then((res)=>{
    	console.log(res.data);
    	this.hCity = res.data;
    });

    groupCity.then((res)=>{
    	let obj = res.data;
      let arr = [];
      for(let k in obj){
      	arr.push(k);
      }
      arr.sort();
      let newArr = [];
      arr.forEach((a)=>{
      	for(let g in obj){
          if(g == a){
            let obj1 = {};
            obj1[a] = obj[g];
            newArr.push(obj1);
          }
        }
      });
      this.gCity = newArr;
    });
  },
  components:{
    heador
  }
}
</script>

<style scoped lang="scss">
  @import '../style/mixin.scss';
  .home{
    width:100%;
    min-height: 100vh;
    background-color:#f3efef ;
    .current{
      @include flex(space-between);
      @include padding(0 .5rem);
      line-height: 2.25rem;
      background-color: white;
      font-size: .6rem;
      span{
        color: grey;
      }
    }
    .cCity{
      line-height: 2rem;
      background-color: white;
      color: $color;
      width: 100%;
      @include flex(space-between);
      @include padding(0 .5rem);
      border-bottom: 1px solid gainsboro;
      border-top: 1px solid gainsboro;
      img{
        width: .7rem;
      }
    }
    .hot{
      margin-top: .5rem;
      color: $color;
      font-size: 0;
      .hotCity{
        font-size: .7rem;
        line-height: 1.7rem;
        @include padding(0 .5rem);
        text-align: left;
        background-color: white;
        border-top: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
      }
    }
    .gCity{
      margin-top: .5rem;
      text-align: left;
      background-color: white;
      font-size: 0;
      .cell{
        text-align: center;
      }
    }
    .title{
      line-height: 1.5rem;
      background-color: white;
      @include padding(0 .5rem);
      text-align: left;
      font-size: .7rem;
      border-bottom:1px solid gainsboro;
      border-right:1px solid gainsboro;
    }
    .cell{
      width: 25%;
      font-size: .7rem;
      margin: 0;
      padding: 0;
      line-height: 2.2rem;
      display: inline-block;
      background-color: white;
      border-bottom:1px solid gainsboro;
      border-right:1px solid gainsboro;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

</style>
