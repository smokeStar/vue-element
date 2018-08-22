<template>
  <div class="msite">
    <heador class="header">
      <img slot="left" src="../images/search.svg" style="width:1rem;" 
                       @click="$router.push('/search')">
      <span slot="middle" class="address" @click="$router.push('/')">{{ address }}</span>
      <span slot="right" @click="$router.push('/login')">登录 | 注册</span>
    </heador>
    <!-- <header style="position: fixed;top: 0;z-index: 1;">
      <img src="../images/search.svg" style="width:1rem;" @click="$router.push('/search')">
      <span class="address" @click="$router.push('/')">{{ address }}</span>
      <span @click="$router.push('/login')">登录 | 注册</span>
    </header> -->
    <div class="mainBox" style="margin-top: 2.3rem;">
      <swipe  class="my-swipe" :auto="0" :show-indicators="true" >
      <swipe-item v-for="l,index in list" :key="index">
        <div class="swipe-item clear" v-for="item in l">
          <div class="img">
            <img :src="'https://fuss10.elemecdn.com/'+item.image_url" >
          </div>
          <div class="des">{{ item.title }}</div>
        </div>
      </swipe-item>
    </swipe>
    <div class="main">
      <div class="shop_header">附近商家</div>
      <div class="shop_item" v-for="r in restaurants" @click="$router.push({path:'/shop', query:{id : r.id}});">
        <div class="left">
          <div class="redball" v-if="$store.state.order['$'+r.id]&&$store.state.order['$'+r.id].length">{{ qty(r.id)}}</div>
          <img v-lazy="'http://images.cangdu.org:8001/img/'+r.image_path" alt="">
        </div>
        <div class="right">
          <div class="top1">
            <div><span class="icon">品牌</span><span class="name">{{ r.name }}</span></div>
            <div class="box">
              <div class="word" v-for="w in r.supports">{{ w.icon_name }}</div>
            </div>
          </div>
          <div class="middle">
            <div class="box">
              <star :rating = r.rating></star>
              <span style="color: brown;font-size:.6rem;margin-left: .2rem">{{ r.rating }}</span>
              <span style="font-size: .4rem;color: grey;margin-left: .3rem">月售{{ r.rating_count }}单</span>
            </div>
            <div>
              <span style="color: white;padding: 0 .1rem;background-color: #3190e8;border: 1px solid #3190e8">蜂鸟专送</span>
              <span style="padding: 0 .1rem;border: 1px solid #3190e8">准时达</span>
            </div>

          </div>
          <div class="bottom">
            <div>¥{{ r.float_minimum_order_amount }}起送/配送费约¥{{ r.float_delivery_fee }}</div>
            <div style="color: grey;">{{ r.distance }}/ <span style="color: #3190e8;">{{ r.order_lead_time }}</span></div>
          </div>
        </div>
      </div>
    </div>
    </div>



  </div>
</template>

<script>
  import { position, list, restaurants } from '../service/getData';
  import star from '../components/star.vue';
  import heador from '../components/common/header.vue';
	export default {
		data () {
			return {
        address    : '',
        list       : [],
        restaurants: []
      }
		},
    activated(){
			console.log(this.$route);

			  // 精确定位
        position(this.$store.state.geohash).then((res) => {
        	    this.address = res.data.name;
          });

        // 食品分类列表
        list.then((res =>{
        	let arr = res.data;
        	let newArr = [];
        	arr.forEach((item,index) =>{
              newArr.push(item);
              if((index+1)%8==0&&index!=0){
                this.list.push(newArr);
                newArr = [];
              }
          });
        }));
        // 商铺信息
      restaurants(this.$store.state.geohash.split(',')[0],this.$store.state.geohash.split(',')[1]).then((res) =>{
      	this.restaurants = res.data;
      })
    },
    components:{
    	  star,
        heador
    },
    methods:{
    	qty(id){
    		  let num = 0;
          this.$store.state.order['$'+id]&&this.$store.state.order['$'+id].length
          &&this.$store.state.order['$'+id].forEach((o)=>{
          	  num += o.qty;
          });
          return num;
      }
    }
	}
</script>

<style lang="scss">
  @import '../style/mixin';
  .msite{
    width: 100%;
    height:100vh;
    min-height:100vh;

    .address{
      font-size: .7rem;
      @include ellipsis;
      width: 50%;
    }
    .header span{
      font-size: .7rem;
    }
    .mainBox{
      height:80vh;
      /*overflow:scroll;*/
    }
    .my-swipe {
      text-align: center;
      width: 100%;
      height: 10rem;
      background-color: white;
      border-bottom: .05rem solid #e4e4e4;
      .swipe-item{
        width: 25%;
        height:4.3rem ;

        @include flex(space-between,column);
        float: left;
        font-size: .6rem;
        padding: 1rem 0 0 0;
        .img{
          width: 2rem;
          height: 2rem;
          img{
            width: 100%;
            height:100%;
          }
        }
        .des{
          line-height: 2rem;
          font-size: .55rem;
        }
      }
      .mint-swipe-indicators{
        bottom:.25rem;
        .mint-swipe-indicator{
          background-color: grey !important;
          opacity:1;
        }
        .mint-swipe-indicator.is-active{
          background-color: #007aff !important;
        }
      }
    }
    .main {
      margin-top: .5rem;
      .shop_header {
        line-height: .5rem;
        color: gray;
        text-align: left;
        padding: .7rem;
        box-sizing: border-box;
        font-size: .6rem;
        background-color: white;
      }
      .shop_item {
        @include flex;
        padding: .7rem .4rem;
        background-color: white;
        border-bottom: 1px solid gainsboro;
        .left {
          width: 4rem;
          height: 3.8rem;
          padding: 0 .3rem .3rem 0;
          box-sizing: border-box;
          position: relative;
          .redball{
            background-color: rgb(255, 70, 29);
            border:1px solid rgb(255, 70, 29);
            -webkit-border-radius:50%;
            -moz-border-radius:50%;
            border-radius:50%;
            min-width: .7rem;
            height:.7rem;
            position: absolute;
            right: .4rem;
            top:.2rem;
            line-height:.7rem;
            color: white;
            font-size: .4rem;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .right{
          flex: 1;
          -webkit-flex: 1;
          height: 3.8rem;
          font-size: .4rem;
          .box{
            @include flex;
          }
          .top1{
            @include flex(space-between);
            .icon{
              background-color: yellow;
              padding: 1px 2px;
            }
            .name{
              font-size: .7rem;
              margin-left: .2rem;
              font-weight: 600;
            }
            .word{
              padding: 0 2px;
              border: 1px solid gray;
              margin-left: .2rem;
            }
          }
          .middle{
            @include flex(space-between);
            line-height: 2rem;

            .star{
              @include flex;
            }
          }
          .bottom{
            @include flex(space-between);
          }
        }

      }
    }
  }


</style>
