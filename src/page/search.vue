<template>
  <div class="search">
    <header>
      <img src="../images/back.svg" @click="$router.push('/msite')">
      <div class="title">搜索</div>
    </header>
    <div class="box">
      <input type="text" placeholder="请输入商家或者美食名称" v-model="keyword" @keyup.enter="submit()">
      <div class="submit" @click="submit()">提交</div>
    </div>
    <div class="result" v-if="!show">
      <div v-show="result.length" style="text-align: left;line-height:2.4rem;font-weight:600;padding-left: .7rem;box-sizing: border-box;">商家</div>
      <div class="resitem" v-for="item in result" v-show="result.length"
           @click="$router.push({path:'/shop',query:{id:item.id}})">
        <div class="left">
          <img :src="'http://images.cangdu.org:8001/img/'+item.image_path" alt="">
        </div>
        <div class="right">
          <div class="info">{{ item.name }}</div>
          <div class="info">月售 {{ item.rating_count }} 单</div>
          <div class="info">{{ item.float_minimum_order_amount }} 元起送 / 配送费约{{ item.float_delivery_fee }} 元</div>
        </div>
      </div>
      <div class="none" v-show="!result.length">很抱歉! 无搜索结果</div>
    </div>
    <div class="history" v-if="show" v-show="seHistory.length">
      <div style="text-align: left;line-height:2.4rem;font-weight:600;padding-left: .7rem;box-sizing: border-box;">搜索历史</div>
      <div class="item"  v-for="item in seHistory" @click="submit(item)">
        <div class="place">{{ item }}</div>
      </div>
      <div class="remove" @click="remove"> 清空所有 </div>
    </div>
  </div>

</template>

<script>
  import { search } from '../service/getData';
	export default {
		data () {
			return {
				show : true,
        keyword:'',
        result:[],
        seHistory:JSON.parse(localStorage.getItem('seHistory'))||[]
      }
		},
    methods:{
			submit(keyword){
				if(keyword) this.keyword = keyword;
				search(this.$store.state.geohash,this.keyword).then((res) =>{
					this.result = (res.data);
					this.show = false;
					if(!this.seHistory.includes(this.keyword)){
            this.seHistory.push(this.keyword);
            localStorage.setItem('seHistory', JSON.stringify(this.seHistory));
          }
        })
      },
      remove(){
				this.seHistory = [];
				localStorage.removeItem('seHistory');
      }
    }
	}
</script>

<style lang="scss" scoped>
  @import '../style/mixin';
  .search{
    min-height: 100vh;
    header{
      .title{
        font-size: 1rem;
        font-weight: 600;
        color: white;
        flex:1;
        text-align: center;
      }
      img{
        width: 16px;
      }
    }
    .box{
      height:3rem;
      background-color: white;
      padding: .6rem;
      @include flex;
      input{
        flex: 1;
        -webkit-flex: 1;
        height: 100%;
        border: 1px solid gainsboro;
        border-radius: .1rem;
        @include padding( 0 0 0 .4rem );
        font-weight: 600;
        font-size: .7rem;
      }
      input:focus{
        border: 1px solid $color;
      }
      .submit{
        width:4rem;
        height: 100%;
        font-size: .8rem;
        line-height: 1.9rem;
        border: 1px solid #3190e8;
        background-color: #3190e8;
        border-radius: .1rem;
        color: white;
        margin-left: .4rem;
      }
    }
    .history,.result{
      text-align: left;
      font-size: .7rem;
    }
    .item{
      background-color: white;
      border-top: 1px solid gainsboro;
      @include padding(.7rem .7rem);
      width: 100%;
      .place{
        color: black;
        font-size: .7rem;
        line-height: 1rem;
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
      line-height: 2.5rem;
      @include padding(0 0 0 .7rem);
      background-color: white;
      margin-top: .2rem;
      text-align: center;
    }
    .remove{
      line-height: 2rem;
      background-color: white;
      text-align: center;
      color: $color;
      font-size: .8rem;
      border-top: 1px solid gainsboro;
    }
    .resitem{
      padding:.5rem;
      background-color: white;
      @include flex();
      .left{
        width: 2.5rem;
        height:4rem;
        img{
          width: 2rem;
          height:2rem;
        }
      }
      .right{
        flex:1;
        -webkit-flex:1;
        height: 4rem;
        border-bottom: 1px solid gainsboro;
        .info{
          line-height: 1.2rem;
        }
      }

    }
  }
</style>
