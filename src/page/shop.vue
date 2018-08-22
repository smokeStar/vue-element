<template>
  <div class="shop">
    <div class="top1">
      <div class="info">
        <div class="left">
          <img :src="`http://images.cangdu.org:8001/img/${restaurant.image_path}`" >
        </div>
        <div class="right">
          <div class="title">{{ restaurant.name }}</div>
          <div class="tip">
            <div class="box">
              <div>商家配送 / 分钟送达 / 配送费¥{{ restaurant.float_delivery_fee }}</div>
              <div>公告:{{ restaurant.promotion_info }}</div>
            </div>
            <div class="icon">
              <img src="../images/go.svg">
            </div>
          </div>
        </div>
      </div>
      <div class="activity" v-if=" restaurant.activities ">
        <div class="a_icon">
            <div v-for="item in restaurant.activities">
              <span>{{ item.icon_name }}</span>
              {{ item.description }} ( APP专享 )
            </div>
          </div>
        <div class="word"><span>{{ restaurant.activities.length }}个活动 </span><img src="../images/go.svg" alt=""></div>
      </div>
    </div>
    <div class="type">
      <div @click="type = 'food'" ><span style="padding:.25rem .5rem" :class="{ active:type == 'food' }">商品</span></div>
      <div @click="evaluation"><span style="padding:.25rem .5rem" :class="{ active:type == 'evalue' }">评价</span></div>
    </div>
    <div class="main"  v-show="type == 'food'">

      <drop></drop>

      <div ref="menu_wrapper" class="menu_wrapper">
        <div class="menu">
          <div class="menu_item" v-for="item,key,index in menus" :class="{ on:item.typeId == choose }" @click="chooseType(item.typeId,index)">
            {{ item.name }}
            <div class="redball" v-if="item.qty>0">{{ item.qty }}</div>
          </div>
        </div>
      </div>
      <div ref="food_wrapper" class="food_wrapper">
        <div class="foodBox" >
          <div class="food" v-for="item in foods">
          <div class="food_title"><span>{{ item.name }}</span>{{ item.description }}</div>
          <div class="food_item" v-for="f in item.foods">
            <div class="food_left">
              <img :src="`http://images.cangdu.org:8001/img/${f.image_path}`" >
            </div>
            <div class="food_right" >
              <div class="food_name">{{ f.name }}</div>
              <div class="food_description">{{ f.description }}</div>
              <div class="food_tip">{{ f.tips }}</div>
              <div class="add"  >
                <div class="price">¥{{ f.specfoods[0].price }}<span v-if="f.specifications&&f.specifications.length">起</span></div>
                <div class="buttonBox" v-if="f.specifications&&f.specifications.length">
                  <transition name="decreaseBtn">
                    <div class="decrease" v-show="f.qty" @click="decrease(f,1)"> </div>
                  </transition>
                  <div class="qty" v-if="f.qty">{{ f.qty }}</div>
                  <div class="addType" @click="add(f,1,item.id,f.item_id)" >选规格</div>
                </div>
                <div class="addButton" v-else>
                  <transition name="decreaseBtn">
                    <div class="decrease" v-show="f.qty" @click="decrease(f)"></div>
                  </transition>
                  <div class="qty" v-if="f.qty">{{ f.qty }}</div>
                  <div class="add_button" @click="add(f,0,item.id,f.item_id,$event);" ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      <!--价格显示-->
      <div class="priceInfo">
        <div class="cart_left">
          <div class="circle">
            <div class="redball" v-if="$store.state.order&&$store.state.order['$'+$route.query.id].length">{{totalFee.num }}</div>
            <div class="imgBox" :class="{blue:totalFee.fee}">
              <img src="../images/shopcart1.svg" v-if=" totalFee.fee" @click="showCart = !showCart;">
              <img src="../images/shopcart.svg" v-if="!totalFee.fee">
            </div>
          </div>
        </div>
        <div class="cart_middle">
          <div class="totalPrice">¥{{totalFee.fee.toFixed(2)}}</div>
          <div class="deliver">配送费{{totalFee.deliverFee.toFixed(2)}}元</div>
        </div>
        <div class="cart_right" v-if="restaurant.float_minimum_order_amount>totalFee.fee" @click="settlement">还差{{ restaurant.float_minimum_order_amount-totalFee.fee }}元起送</div>
        <div class="cart_right" style="background-color:#4cd964;color:white;font-size:.7rem;" v-else @click="settlement">去结算</div>
      </div>
      <!--购物车-->
      <div class="shop_bg" v-show="showBg"></div>
      <transition name="toggle_cart">
        <div class="shopCart" v-show="showBg">
          <div class="head">
            <div class="name">购物车</div>
            <div class="car_right" @click="remove">
              <img src="../images/delete.svg">
              <span>清空</span>
            </div>
          </div>
          <div class="shopBox">
            <div class="shopItem" v-for="item in $store.state.order['$'+$route.query.id]">
              <div class="shop_left">
                <div class="car_name">
                  <div class="name">{{ item.name }}</div>
                  <div class="format" v-if="item.format">{{ item.format }}</div>
                </div>
                <div class="car_price" >¥{{ item.price }}</div>
              </div>
              <div class="addButton">
                <div class="button">
                  <div class="decrease" v-show="item.qty>0" @click="shopDecrease(item.id,item.itemId)"></div>
                  <div class="qty" v-show="item.qty>0">{{item.qty}}</div>
                  <div class="add_button" @click="shopAdd(item.id,item.itemId)"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </transition>
      <!--规格选择框-->
      <div class="alertTips" v-show="show">
        <div class="alertBox">
          <img src="../images/close.svg" @click="show = false">
          <div class="alert_title">{{ title }}</div>
          <div v-for="item in food_format" class="alert_middle">
            <div class="alert_name">{{ item.name }} :</div>
            <div class="alert_type" v-if="v" v-for="v in item.values" @click="chooseFormat(item.name,v)" :class="{on:format == v}">{{ v }}</div>
          </div>
          <div class="alert_bottom">
            <div class="alert_price">¥{{ price }}</div>
            <div class="addtoCart" @click="submit" >选好了</div>
          </div>
        </div>
      </div>

    </div>
    <div ref="eva_wrapper" class="eva_wrapper" v-if="type == 'evalue'">
      <div class="evaluation">
        <div class="comprehensive">
          <div class="score_left">
            <div style="color: orangered;font-size: .8rem">{{score.overall_score.toFixed(1)}}</div>
            <div>综合评价</div>
            <div class="compare">高于周边商家{{(100*score.compare_rating).toFixed(1)}}%</div>
          </div>
          <div class="score_right">
            <div class="server">
              <div>服务态度</div>
              <star :rating="Number(score.service_score.toFixed(1))"></star>
              <div>{{score.service_score.toFixed(1)}}</div>
            </div>
            <div class="server">
              <div>菜品评价</div>
              <star :rating="Number(score.service_score.toFixed(1))"></star>
              <div>{{ score.food_score.toFixed(1) }}</div>
            </div>
            <div class="server">
              <div>送达时间</div>
              <div style="font-size: .55rem;color: grey;">{{ score.deliver_time }}分钟</div>
            </div>
          </div>
        </div>
        <div class="elvalueType">
          <div v-for="item in evalueType" @click="evalueChoose =item.name" :class="{eon:evalueChoose==item.name}">{{item.name}}({{ item.count }})</div>
        </div>
        <div class="evalueMsg">
          <div class="eva_item" v-for="item in evalueMsg">
            <div class="avatar">
              <img src="http://test.fe.ptdev.cn/elm/elmlogo.jpeg" >
            </div>
            <div class="eva_right">
              <div class="name_time">
                <div class="name">匿名用户</div>
                <div class="time">{{  item.rated_at }}</div>
              </div>
              <div class="eva_server">
                <div class="eva_shop">商家服务: <span style="color: orange">非常满意</span></div>
                <div class="eva_shop">商品: <span style="color: orange">非常满意</span></div>
                <div class="arrive">{{ item.time_spent_desc }}</div>
              </div>
              <div class="rating_text">
                {{ item.rating_text || '准时送达,干净卫生,味道好,便宜又划算,包装精美,分量足.' }}
              </div>
              <div class="food_rating">
                <div class="food_rating_item" v-for="f in item.item_ratings">
                  <div><span style="color:deepskyblue">{{ f.food_name }}:</span>干净卫生,味道好,nice,比吃快餐好太多了!</div>
                </div>
              </div>
              <div class="food_img">
                <img src="https://fuss10.elemecdn.com/d/c8/64033625905f0a15a2d181d53a425jpeg.jpeg" v-if="i.image_hash" v-for="i in item.item_ratings">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { detail, food, evalueScore, evalueTpyes, evalueMsgs } from '../service/getData';
  import BScroll from 'better-scroll';
  import drop from '../components/dropBall.vue';
  import star from '../components/star.vue';
  import { bus } from '../components/common/bus.js';

  export default {
		data () {
      return{
				restaurant  : {},             // 餐馆信息
        foods       : [],             // 菜品列表
        menus       : {},             // 菜单列表
        type        : 'food',         // 类别
        choose      : '',             // 评价或者商家
        menu_scroll : null,           // 菜单容器
        menu_height : null,           // 菜单高度
        food_scroll : null,           // 菜品容器
        food_height : {},             // 菜品title高度列表
        food_format : [],             // 规格数组
        title       : null,           // 当前菜品名称
        show        : false,          // 是否显示规格选择框
        price       : null,           // 价格
        format      : '默认',          // 规格
        priceFormat : [],             //
        id          : null,           // 菜品id
        showCart    : false,          // 显示cart
        score       : {},
        evalueType  : [],
        evalueChoose: '全部',
        eva_scroll  : null,
        evalueMsg   : [],
        elLeft      : 0,
        elTop       : 0
      }
    },
    created(){
			if(!this.$route.query.id) return;
      if(!this.$store.state.order['$'+this.$route.query.id]){
        this.$set(this.$store.state.order,'$'+this.$route.query.id,[]);
      }
      
      detail(this.$route.query.id).then((res) =>{
      	  this.restaurant = res.data;
          console.log(this.restaurant);
      });
      food(this.$route.query.id).then((res) =>{
      	  this.foods = res.data;
          console.log(this.foods);
          this.foods.forEach((f) =>{
      	  	  this.$set(f,'menuqty',0);
      		    f.foods.forEach(ff=>{
                  // 追加双向绑定数据
                  this.$set(ff,'qty',0);
                  if(this.$store.state.order&&this.$store.state.order['$'+this.$route.query.id].length){
                      this.$store.state.order['$'+this.$route.query.id].forEach((o)=>{
                          ff.specfoods.forEach((fs)=>{
                              if(o.id == fs.food_id){
                                  ff.qty += o.qty;
                                  f.menuqty += o.qty;
                              }
                          });
                      })
                  }else{
                      this.$set(ff,'qty',0);
                  }
              });
              this.menus['$'+f.id] = { name:f.name, typeId:f.id, qty:f.menuqty };
        });
      	  let menus = [];
      	  for(let key in this.menus ){
      	  	  menus.push(key);
          }
      	  this.choose = menus.length && this.menus[menus[0]].typeId || null;
          // 菜品title高度对象的生成
        	this.$nextTick(()=>{
              let foodList = Array.from(document.getElementsByClassName('food'));
              let height = null;
                  foodList.forEach((f,id) =>{
                      height += f.offsetHeight;
                      this.food_height['$'+(id+1)] = height;
                  });
              this.food_height['$0'] = 0;
            })
      });
      evalueScore(this.$route.query.id).then((res) =>{
        this.score = res.data;
        console.log(this.score);
      });
      evalueTpyes(this.$route.query.id).then((res) =>{
        this.evalueType = res.data;
        this.evalueType = this.evalueType.filter((e,index)=>{
        	return index < 4;
        })
        console.log(this.evalueType);
      });
      evalueMsgs(this.$route.query.id).then((res) =>{
        this.evalueMsg = res.data;
        console.log(this.evalueMsg);
      });
      this.$nextTick(() => {
        //  初始化容器
        let menu_wrapper = this.$refs.menu_wrapper;
        let food_wrapper = this.$refs.food_wrapper;
        this.menu_scroll = new BScroll(menu_wrapper,{ click:true });
        this.food_scroll = new BScroll(food_wrapper,{ click:true });
      });
    },
    beforeRouteLeave(to,from,next){
        this.menu_scroll&&this.menu_scroll.destroy();
        this.food_scroll&&this.food_scroll.destroy();
        this.eva_scroll &&this.eva_scroll.destroy();
    	  next();
    },
    methods:{
    	test(){
    		console.log(123);
      },
      // 选择菜单类别
    	chooseType(id,index){
          this.choose = id;
          let y = this.food_height['$'+index]; // food列表相应移动到对应的位置
          this.food_scroll.scrollTo(0,-y,800);
      },
      // 加
      add(item,type,menuId,itemId,event){
          this.food_format = item.specifications;
          this.format      = item.specfoods[0].specs_name;
          this.id          = item.specfoods[0].food_id;
          this.price       = item.specfoods[0].price;

          item.specfoods.forEach((sp) => {
              sp.specs.forEach((spec) => {
                  spec.price = sp.price;
                  spec.id = sp.food_id;
                  this.priceFormat.push(spec);
              });
          });
          this.title = item.name;

          // 多规格的加减
          if(type == 1){
              // 显示规格加减窗口
              this.show = true;
              // 监听一个自定义事件，只触发一次。
              this.$once('already', (data) => {
                  item.qty++;
                  this.menus['$'+item.category_id].qty++;
                  let flag = false;
                  if(this.$store.state.order&&this.$store.state.order['$'+this.$route.query.id].length){
                      this.$store.state.order['$'+this.$route.query.id].forEach((o) => {
                          if(o.id == this.id){
                              o.qty++;
                              flag = true;
                          }
                      })
                  }
                  if(!flag){
                      let order = { 
                            name        :this.title
                        ,   id          :this.id
                        ,   price       :this.price
                        ,   deliverFee  :this.restaurant.float_delivery_fee
                        ,   format      :this.format
                        ,   qty         :1
                        ,   menuId      :menuId
                        ,   itemId      :itemId
                         };
                      this.$store.state.order['$'+this.$route.query.id].push(order);
                  }

              })
          }
          else{
              // 单品的加减
              item.qty++;
              this.menus['$'+item.category_id].qty++;
              let flag = false;
              this.$store.state.order['$'+this.$route.query.id].forEach((o) => {
                if(o.id == this.id){
                    o.qty++;
                    flag = true;
                }
              });
              if(!flag){
                  let order = { 
                          name      : this.title
                      ,   id        : this.id
                      ,   price     : this.price
                      ,   deliverFee: this.restaurant.float_delivery_fee
                      ,   qty       : 1
                      ,   menuId    : menuId
                      ,   itemId    : itemId
                  };

                  this.$store.state.order['$'+this.$route.query.id].push(order);
              }
              // 下落小球
              this.elLeft = event.target.getBoundingClientRect().left;
              this.elTop  = event.target.getBoundingClientRect().bottom;
              bus.$emit('drop',this.elLeft,this.elTop);
          }
      },
      // 减
      decrease(item,type){
          if(type == 1){
              return alert('多规格商品请在购物车删除!');
          }else{
              item.qty --;
              this.menus['$'+item.category_id].qty--;
              this.$store.state.order['$'+this.$route.query.id].forEach((o,index) =>{
                  if(item.name == o.name){
                      o.qty--;
                      if( o.qty==0 ){
                          this.$store.state.order['$'+this.$route.query.id].splice(index,1);
                      }
                  }
              });
          }
      },
      // 选择规格
      chooseFormat(name,v){
      	  this.format = v;
          this.priceFormat.forEach((pf) => {
              if(name == pf.name && v == pf.value){
                  this.price = pf.price;
                  this.id    = pf.id;
              }
          });
      },
      // 我选好了
      submit(){
          this.show = false;
          this.$emit('already',{price:this.price,id:this.id});
      },
      // 购物车加
      shopAdd(id,itemId){
          this.$store.state.order['$'+this.$route.query.id].forEach((o,index) => {
              if(itemId == o.itemId && id == o.id){
                  this.foods.forEach((f)=>{
                      f.foods.forEach((ff)=>{
                          if(ff.item_id == itemId){
                            ff.qty++;
                          }
                      });
                  })
              }
              if(id == o.id){
                  o.qty ++;
                  this.menus['$'+o.menuId].qty++;
              }
          })
      },
      // 购物车减
      shopDecrease(id,itemId){
          this.$store.state.order['$'+this.$route.query.id].forEach((o,index) => {
              if(itemId == o.itemId && id == o.id){
                  this.foods.forEach((f)=>{
                      f.foods.forEach((ff)=>{
                          if(ff.item_id == itemId){
                              ff.qty--;
                          }
                      });
                  })
              }
              if(id == o.id){
                  o.qty --;
                  this.menus['$'+o.menuId].qty--;
                  if(o.qty <= 0){
                      this.$store.state.order['$'+this.$route.query.id].splice(index,1);
                  }
              }
          })
      },
      // 清空购物车
      remove(){
          this.foods.forEach((f)=>{
              f.foods.forEach((ff)=>{
                  ff.qty=0;
              });
          });
          this.$store.state.order['$'+this.$route.query.id] = [];
          for(let k in this.menus){
          	  this.menus[k].qty = 0;
          }
      },
      // 评价
      evaluation(){
      	  this.type = 'evalue';
      	  this.$nextTick(()=>{
              // 必须在dom创建好以后再初始化
              let eva_wrapper = this.$refs.eva_wrapper;
              this.eva_scroll = new BScroll(eva_wrapper,{
                  probeType: 3,
                  deceleration: 0.003,
                  bounce: false,
                  swipeTime: 2000,
                  click: true,
              });
          });
      },
      // 结算
      settlement(){
          this.$store.state.restaurant = this.restaurant;
          localStorage.setItem('restaurant',JSON.stringify(this.$store.state.restaurant));
          if(this.$store.state.isLogin){
              this.$router.push('/confirm');
          }else{
              this.$router.push('/login')
          }
      }
    },
    computed:{
        showBg(){
            if(this.$store.state.order&&this.$store.state.order['$'+this.$route.query.id].length == 0){
                this.showCart = false;
            }
            if(this.$store.state.order&&this.$store.state.order['$'+this.$route.query.id].length && this.showCart){
                return true;
            }else{
                return false;
            }
        },
        totalFee(){
          let fee        = 0;
          let deliverFee = 0;
          let num        = 0;
          this.$store.state.order['$'+this.$route.query.id].forEach((o)=>{
            fee += o.price*o.qty;
            deliverFee = o.deliverFee;
            num += o.qty;
          });
          localStorage.setItem('order',JSON.stringify(this.$store.state.order));
          return { fee, deliverFee, num };
        }
    },
    components:{
    	  drop, star
    }
	}
</script>

<style lang="scss" scoped>
  @import '../style/mixin';
  .shop{
    min-height: 100vh;
    position: relative;
    .toggle_cart-enter-active, .toggle_cart-leave-active{
      transition: all .3s ease-out;
    }
    .toggle_cart-enter,.toggle_cart-leave-active{
      transform:translateY(100%);
    }
    .decreaseBtn-enter-active, .decreaseBtn-leave-active{
      transition: all .4s ease-out;
    }
    .decreaseBtn-enter, .decreaseBtn-leave-active{
      @include prix(transform,translateX(2.6rem) rotate(360deg));
    }
    .redball{
      background-color: rgb(255, 70, 29);
      border:1px solid rgb(255, 70, 29);
      -webkit-border-radius:50%;
      -moz-border-radius:50%;
      border-radius:50%;
      min-width: .7rem;
      height:.7rem;
      position: absolute;
      right: .2rem;
      top:.2rem;
      line-height:.7rem;
      color: white;
      font-size: .4rem;
    }
    .addButton{
      position: relative;
      width: 3.5rem;
      height:1.2rem ;
    }
    .price{
      color: orangered;
      font-size: .65rem;
      font-weight: 600;
    }

    .add_button{
      position: absolute;
      right:0;
      top:0;
      width: .9rem;
      height:.9rem;
      background: url("../images/add.svg") no-repeat;
      background-size: 100% 100%;
      border-radius: 50%;
    }
    .decrease{
      position: absolute;
      left: 0;
      top:0;
      width: .9rem;
      height:.9rem;
      background: url("../images/decrease.svg") no-repeat;
      background-size: 100% 100%;
      border-radius: 50%;
    }
    .qty{
      position: absolute;
      left: 50%;
      top: 38%;
      transform:translateX(-50%) translateY(-50%);
    }
    .top1{
      @include padding(.4rem);
      font-size: .4rem;
      color: white;
      background-color: $color;
      .info{
        @include flex;
        .left{
          width: 3.8rem;
          height: 3.4rem;
          padding:0 .4rem 0 0;
          img{
            width: 100%;
            height:100%;
          }
        }
        .right{
          flex: 1;
          height: 3.4rem;
          text-align: left;
          line-height: 1.1rem;
          .title{
            font-size: 1rem;
            line-height: 1.4rem;
            font-weight: 600;
          }
        }
        .tip{
          @include flex(space-between);
          .icon{
            width: 1.5rem;
            height:1.5rem;
            img{
              width: 100%;
              height:100%;
            }
          }
        }
      }
      .activity{
        @include flex(space-between);
        line-height: 2rem;
        .a_icon{
          height: 2rem;
          overflow: hidden;
        }
        .a_icon span{
          padding:.15rem;
          background-color: orange;
          margin-right: .15rem;
        }
        .word>span{
          vertical-align: middle;
        }
        img{
          width: .8rem;
          height:.8rem;
          vertical-align: middle;

        }
      }
    }
    .type{
      line-height: 2.5rem;
      @include flex;
      font-size: .6rem;
      background-color: white;
      div{
        width:50%;
        height: 100%;
        line-height: 2.5rem;
      }
      .active{
        border-bottom: .15rem solid $color;
        color: $color;
      }
    }
    .main{
      @include flex;
      align-items: flex-start;
      height:100%;
      .menu_wrapper{
        height:62vh;
        overflow: hidden;
      }
      .food_wrapper{
        height:62vh;
        overflow: hidden;
        @include prix(flex,1);
      }
      .menu{
        font-size: .65rem;
        width: 4.5rem;

        @include prix(box-bottom-shadow,1px 1px 0 0 gainsboro);
        .menu_item{
          width: 100%;
          border-bottom:1px solid gainsboro;
          position: relative;
          line-height: 3.25rem;
          overflow: hidden;
          -ms-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space:nowrap;
        }
        .on{
          background-color: white;
          border-left: .1rem solid $color;
        }
      }
      .foodBox{
        flex: 1;
        background-color: white;
        -webkit-flex: 1;
        text-align: left;
        .food_title{
          background-color: $bg;
          font-size: .4rem;
          line-height: 2.5rem;
          color: grey;
          span{
            font-size: .7rem;
            font-weight: 600;
            margin:0 .5rem 0 1rem;
            color: black;
          }
        }
        .food_item{
          @include flex;
          @include padding(.5rem .3rem);
          font-size: .5rem;
          text-align: left;
          align-items: flex-start;
          border-bottom: 1px solid ghostwhite;
          .food_left{
            width: 2.7rem;
            height:2.4rem;
            padding-right: .3rem;
            img{
              width:100%;
              height:100%;
            }
          }
          .food_right{
            flex:1;
            -webkit-flex: 1;
            line-height: 1.2rem;
            .food_name{
              font-size: .65rem;
              font-weight: 600;
            }
            .food_description{
              color: grey;
            }
            .food_tip{
              font-size: .4rem;
            }
            .add{
              width: 100%;
              @include flex(space-between);
              @include padding(0 .1rem 0 0);
              .buttonBox{
                position: relative;
                width: 5rem;
                height:1.6rem ;
                .addType{
                  @include padding(.15rem .4rem);
                  background-color: $color;
                  color: white;
                  border-radius: .8rem;
                  position: absolute;
                  right:0;
                }
                .decrease{
                  left:0;
                  top:50%;
                  transform:translateY(-50%);
                }
                .qty{
                  left:30%;
                  top:50%;
                  transform:translateX(-50%) translateY(-50%);
                }
              }
            }
          }
        }
      }
    }
    .priceInfo{
      position: fixed;
      bottom:0;
      width: 100%;
      height:2.25rem;
      font-size: .5rem;
      background-color: #444;
      color: white;
      z-index:1;
      @include flex(space-between);
      @include flex;
      .cart_left{
        width: 4.5rem;
        height: 100%;
        position: relative;
        .circle{
          z-index: 999;
          width: 2.8rem;
          height: 2.8rem;
          @include prix(border-radius, 50%);
          position: absolute;
          top: -1rem;
          background-color: #444;
          @include padding(.2rem);
          left: 50%;
          @include prix(transform,translateX(-50%));
          text-align: center;
          .imgBox{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #444;
            @include flex(center);
            img{
              width:65%;
            }
          }
          .blue{
            background-color: $color;
          }
        }
      }
      .cart_right{
        width: 6rem;
        height:100%;
        line-height: 2.25rem;
        color: white;
        background-color: #535356;
        font-weight: 600;
      }
      .cart_middle{
        @include prix(flex,1);
        text-align: left;
        .totalPrice{
          font-weight: 600;
          font-size: .6rem;
        }
        .deliver{
          font-size: .4rem;
        }
      }
    }
    .shop_bg{
      position: fixed;
      width: 100%;
      height:100vh;
      background-color: rgba(0,0,0,.7);
      bottom: 2.25rem;
    }
    .shopCart{
      position: fixed;
      bottom:2.25rem;
      width:100%;
      .head{
        z-index:20;
        width: 100%;
        height: 2.5rem;
        line-height: 2.5rem;
        background-color: gainsboro;
        @include flex(space-between);
        font-size: .7rem;
        .name{
          margin-left: 1rem;
        }
        .car_right{
          @include flex(space-between);
          margin-right: .5rem;
          font-size: .6rem;
          img{
            width: .8rem;
            margin-right:.2rem;
          }
        }
      }
      .shopBox{
        background-color: white;
        max-height:20rem;
        z-index: 2;
        overflow: scroll;
        .shopItem{
          @include flex(space-between);
          line-height: 2.5rem;
          font-size: .6rem;
          .car_name{
            margin-left: 1rem;
            line-height: 100%;
            .name{
             font-size: .6rem;
             font-weight: 600;
            }
            .format{
              font-size: .5rem;
              text-align: left;
              line-height: 1rem;
            }
          }
          .addButton{
            margin:0 .5rem;
            height:.8rem;
            .qty{
              top: 59%;
            }
          }
          .shop_left{
            @include flex(space-between);
            @include prix(flex,1);
            .car_price{
              color: orangered;
              margin-right: 2rem;
              font-weight: 600;
              font-size:.7rem;
            }
          }
        }
      }
    }
    .alertTips{
      position: absolute;
      top:0;
      left:0;
      width: 100%;
      height: 100vh;
      background-color: rgba(0,0,0,.6);
      z-index: 1;
      .alertBox{
        position: absolute;
        top:50%;
        left:50%;
        transform:translateX(-50%) translateY(-50%);
        width: 85%;
        background-color: white;
        @include prix(border-radius,.1rem);
        font-size: .6rem;
        img{
          width: 1.6rem;
          position: absolute;
          top:.2rem;
          right:.2rem;
        }
        .alert_title{
          line-height: 2.9rem;
          font-size: .9rem;
          font-weight: 600;
        }
        .alert_middle{
          padding-left: .5rem;
          box-sizing: border-box;
          text-align: left;
          .alert_name{
            color: gray;
            text-align: left;
            line-height: 1.5rem;
          }
          .alert_type{
            padding: .3rem 1rem;
            background-color: gainsboro;
            margin-right: .3rem;
            display: inline-block;
          }
          .on{
            background-color:skyblue;
            color: white;
          }
        }
        .alert_bottom{
          margin-top: .6rem;
          line-height: 2rem;
          border-top: 1px solid gainsboro;
          font-size: .8rem;
          @include flex(space-between);
          .alert_price{
            color: orangered;
            margin-left: .45rem;
          }
          .addtoCart{
            color: white;
            line-height: 2rem;
            width: 4.5rem;
            background-color: $color;
            font-size: .7rem;
          }
        }
      }
    }
    .comprehensive{
      @include padding(.8rem .5rem);
      @include flex(space-between);
      font-size: .7rem;
      margin: .1rem 0 .5rem;
      background-color: white;
      .score_left{
        width:40%;
        border-right:1px solid grey;
        div{
          text-align: center;
          line-height: 1.2rem;
        }
        .compare{
          font-size: .5rem;
        }
      }
      .score_right{
        font-size: .6rem;
        width: 50%;
        .server{
          @include flex;
          line-height: 1.2rem;
          div{
            margin-right: .5rem;
          }
        }

      }
    }
    .eva_wrapper{
      height: 68vh;
      overflow: hidden;
    }
    .elvalueType{
      background-color: white;
      font-size: .5rem;
      margin-bottom: .1rem;
      @include padding(.5rem .8rem);
      @include flex;
      div{
        @include padding(.3rem .4rem);
        color: grey;
        background-color: rgba(51,102,205,.1);
        margin-right: .5rem;
      }
      .eon{
        background-color: $color;
        color: white;
      }
    }
    .evalueMsg{
      background-color: white;
      .eva_item{
        @include flex;
        align-items: flex-start;
        .avatar{
          @include padding( 1rem 0 0 .5rem );
          img{
            width: 1.6rem;
            height:1.6rem;
            border-radius: 50%;
          }
        }
        .eva_right{
          text-align: left;
          @include padding(.8rem .5rem);
          font-size: .55rem;
          .name_time{
            @include flex;
            .name{
              margin-right: .8rem;
              line-height: 1.5rem;
            }
          }
          .eva_server{
            @include flex;
            line-height: 1rem;
            div{
              margin-right: .2rem;
            }
          }
          .rating_text{
            margin: .7rem 0;
          }
          .food_img>img{
            width: 4rem;
            margin-right: 1rem;
          }
          .food_rating_item{
            margin: .5rem 0;
            line-height: .8rem;
          }
          .eva_shop{
            padding-right: .2rem;
            border-right: 1px solid grey;
            line-height: .5rem;
          }
        }

      }
    }

  }

</style>
