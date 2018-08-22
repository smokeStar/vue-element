<template>
  <div class="city" >
    <heador>
      <img slot="left" src="../images/back.svg" width=".8rem" @click="$router.push('/')">
      <div slot="middle" style="font-size: .9rem;font-weight: 600"> {{ $route.query.name }} </div>
      <div slot="right" @click="$router.push('/')">切换城市</div>
    </heador>
    <!-- <header>
      <img src="../images/back.svg" width=".8rem" @click="$router.push('/')">
      <div style="font-size: .9rem;font-weight: 600"> {{ $route.query.name }} </div>
      <div @click="$router.push('/')">切换城市</div>
    </header> -->
    <div class="search">
      <input type="text" placeholder="输入学校、商务楼、地址" v-model="keyword" @keyup.enter="submit" required>
      <div class="submit" @click="submit" >提交</div>
    </div>
    <div class="result" v-if="!show">
      <div class="item" v-for="item in info" v-show="info.length" @click="goPage(item)">
        <div class="place">{{ item.name }}</div>
        <div class="detail">{{ item.address }}</div>
      </div>
      <div class="none" v-show="!info.length">很抱歉! 无搜索结果</div>
    </div>
    <div class="history" v-if="show" v-show="historys.length">
      <div style="text-align: left;line-height:1.5rem;padding-left: .7rem;box-sizing: border-box;">搜索历史</div>
      <div class="item"  v-for="item in historys" @click="goPage(item)">
        <div class="place">{{ item.name }}</div>
        <div class="detail">{{ item.address }}</div>
      </div>
      <div class="remove" @click="remove"> 清空所有 </div>
    </div>
  </div>
</template>

<script>
  import heador from '../components/common/header.vue';
	export default {
		data (){
      return {
      	keyword:'',
        show   : true,
        info   : [],
        historys: JSON.parse(localStorage.getItem('history')) || []
      }
    },
    methods:{
			submit(){
        this.$loading.close();
				if(!this.keyword) return;
				let url =`http://cangdu.org:8001/v1/pois?city_id=${this.$route.params.id}&keyword=${this.keyword}&type=search`;
				this.$http(url).then((res)=>{
					this.info = res.data;
					this.show = false;
        })
      },
      goPage(item){
        this.$store.state.geohash = item.geohash;
        localStorage.setItem('geohash',JSON.stringify(this.$store.state.geohash));
        this.$router.push({ path:'/msite',query:{geohash:item.geohash} });
        let check = true; // 查重标志位,数组的indexOf和includes方法不能查对象是否存在
        this.historys.forEach(h=>{
        	if(h.geohash == item.geohash){
        		check = false;
          }
        });
        if(check){
          this.historys.push(item);
          localStorage.setItem('history',JSON.stringify(this.historys));
        }
      },
      remove(){
      	this.historys = [];
      	localStorage.removeItem('history');
      }
    },
    mounted(){
      this.$alert(123123);
    },
    components:{
      heador
    }

	}
</script>

<style lang="scss" scoped>
  @import '../style/mixin';
  .city{
    width: 100%;
    min-height: 100vh;
    @include padding(2.5rem 0 0);
    .search{
      margin-top: .5rem;
      border-bottom: .05rem solid gainsboro;
      border-top: .05rem solid gainsboro;
      @include padding(.5rem .7rem);
      background-color: white;
      input{
        border: .05rem solid gainsboro;
        width: 100%;
        height: 1.5rem;
        @include padding(0 0  0 .25rem);
        font-size: .6rem;
      }
      .submit{
        @include button
      }
    }
    .history,.result{
      text-align: left;
    }
    .item{
      background-color: white;
      border-top: .05rem solid gainsboro;
      @include padding(.7rem .7rem);
      width: 100%;
      .place{
      
        color: black;
        font-size: .7rem;
        line-height: 1.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .detail{
        color: grey;
        line-height: 1rem;
        font-size: .6rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .none{
      line-height: 2rem;
      @include padding(0 0 0 .7rem);
      background-color: white;
    }
    .remove{
      line-height: 2rem;
      background-color: white;
      text-align: center;
      color: grey;
      font-size: .8rem;
      border-top: .05rem solid gainsboro;
    }
  }
</style>
