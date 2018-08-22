<template>
	<div class="order">
		<div class="top" v-if="!show">
			<div class="word">
				<img src="../images/back.svg"  @click="$router.go(-1)">
				<div class="arrive">订单配送至</div>
			</div>

			<div class="address" @click="$router.push('/address')"
				 v-if="address.length && (index1 != 'no')">

				<div class="address_info">
					<span class="tag">
						{{ address[Number(index1)].tag == 'home'    && '家'   || '' }}
						{{ address[Number(index1)].tag == 'company' && '公司' || '' }}
						{{ address[Number(index1)].tag == 'school'  && '学校' || '' }}
					</span>
					<span>
						{{ address[Number(index1)].address }}
						{{ address[Number(index1)].address_detail }}
					</span>
					<img src="../images/gone1.svg" >
				</div>

				<div class="person_info">
					<span style="margin-right:.3rem;">
						{{ address[Number(index1)].name }}
						({{ address[Number(index1)].sex == 1 && '先生' || '女士' }}) 	
					</span>
					{{ address[Number(index1)].phone }}
				</div>

			</div>

			<div class="add" @click="$router.push('/address')" v-else>
				<img src="../images/address.svg" alt="">
				添加收货地址
			</div>

		</div>
		<div class="top1" v-show="show">
			<img src="../images/back.svg" class="goback"  @click="$router.go(-1)">

			<div class="tip" style="margin-left:.4rem;"
				  v-if="address.length && index1 != 'no'">
				<span class="tag">
					{{ address[Number(index1)].tag == 'home' && '家' || '' }}
					{{ address[Number(index1)].tag == 'company' && '公司' || '' }}
					{{ address[Number(index1)].tag == 'school' && '学校' || '' }}
				</span>
					{{ address[Number(index1)].address }}
					{{ address[Number(index1)].address_detail }}
			</div>

			<div class="tip" style="margin-left:.4rem;" v-else >
				<img src="../images/warning.svg" >
				未添加收货地址
			</div>

		</div>
		<div class="main" ref="main">
			<div class="info">
				<div class="arrive_item" @click="showBox">
					<span>尽快送达 [ 预计 {{timeArr[timeIndex]}} ]</span>
					<img src="../images/gone.svg" alt="">
				</div>
				<div class="payment">
					<span>支付宝</span>
					<div>
						<span style="font-size:.5rem; color:grey;">更换支付方式</span>				
						<img src="../images/gone.svg" alt="">
					</div>
				</div>
			</div>
			<div class="food_detail">
				<div class="restaurant">
					<div class="line"></div>
					<span>川湘现炒快餐(南联店)</span>
					<div class="line"></div>
				</div>
				<div class="food_bottom">
					<div class="food_item" v-for="item in $store.state.order['$'+$store.state.restaurant.id]">
						<div class="food">
							<div>{{ item.name }}</div>
							<div style="color:grey;font-size:.5rem;line-height:.7rem;">
								{{ item.format }}
							</div>
						</div>
						<div class="right">
							<div class="qty">x{{ item.qty }}</div>
							<div class="price" style="color:red;">¥{{ item.price }}</div>
						</div>
					</div>
					<div class="deliver_fee">
						<span>配送费</span>
						<span>
							¥{{ $store.state.order['$'+$store.state.restaurant.id][0].deliverFee }}
						</span>
					</div>
					<div class="gift">
						<span>红包</span>
						<div class="gift_right">
							<span class="gift_info" style="font-size:.5rem;color:grey;">	
								无可用红包

							</span>
							<img src="../images/gone.svg" alt="">
						</div>
					</div>
					<div class="total">
						<div class="detail" style="font-size:.5rem;color:grey;">优惠说明</div>
						<div class="money">
							小计  
							<span style="font-size:.7rem;margin-left:.3rem;">
							¥{{totalFee.toFixed(2)}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="preference" @click="$router.push('/remark')">
				<div>餐具份数 / 口味偏好</div>
				<div>
					<span style="color:green;font-size:.5rem">马上助力环保</span>
					<img src="../images/gone.svg">
				</div>
			</div>
			<div class="ticket">
				<div>不需要发票</div>
				<img src="../images/gone.svg">
			</div>
		</div>
		<div class="bottom">
			<div class="bottom_left">
				<span style="font-size:.8rem;">¥{{totalFee.toFixed(2)}}</span>
				<!-- <span style="font-size:.5rem; margin:0 .6rem">|</span>
				<span style="font-size:.5rem;">已优惠 ¥50</span> -->
			</div>
			<div class="bottom_right">确认支付</div>
		</div>

		<div class="time" v-show="showTime" ref="time">
		</div>
		<transition name="timeBox">
		<div class="timeBox" v-show="showTime">
			<div class="time_title">选择送达时间</div>
			<div class="time_list">
				<div class="time_left">
					<div class="weekday">今日 (星期{{new Date().getDay()}})</div>
				</div>
				<div class="time_right">
					<div class="time_item" v-for="item,index in timeArr" @click="chooseTime(index)">
					<span v-if="index==0">尽快送达 | 预计</span>	
					<span>{{ item }}</span>
					<span style="font-size:.3rem;color:grey;margin-left:.3rem;">
						({{ $store.state.order['$'+$store.state.restaurant.id][0].deliverFee }}元配送费)
					</span>
					<img src="../images/yes.svg" v-show="timeIndex == index">
					</div>
				</div>
			</div>
		</div>
		</transition>
	</div>	

</template>

<script>
	import { addresses } from '../service/getData.js';
	export default{
		data(){
			return{
				show 	 : false,  // 显示选择地址提示
				showTime : false,  // 显示送餐时间
				timeArr  : [],     // 时间列表
				timeIndex: 0,
				address  : [],
				index1   : null,
			}
		},

		activated(){
			this.showDetail();
			this.timeArr = this.getTime();
			addresses(Number(this.$store.state.userId)).then((res) => {
				this.address = res.data;
				this.index1 = localStorage.getItem('index') || 'no';
			});
		},

		methods:{
			// 监听scroll从而是否显示选择地址提示
			showDetail(){
				let main = this.$refs.main;
				document.addEventListener('scroll',(e)=>{
				  	if(window.scrollY >= 140){
				  		this.show = true;
				  		main.style.marginTop = '5.55rem';
				  	}else{
				  		this.show = false;
				  		main.style.marginTop = '0';
				  	}
				})
			},

			// 获取送餐时间列表
			getTime(){
				let now  		= new Date(),
				    hour 		= now.getHours(),
				    min 		= now.getMinutes(),
				    timeArr     = [],
					i    		= 0,
					j           = 0,
					step        = 15,
				    deliverTime = this.$store.state.restaurant.order_lead_time || '30分钟' ;
					deliverTime = Number(deliverTime.substring(0,deliverTime.length-2));
				while(true){
					i++;
					let time = null;
					// 定义步长
					if(i == 1){
						step = deliverTime;
					}else{
						step = 15;
					}
					// 第二个时间数据必须可以被15整除,且与第一个时间数据之差必须大于配送时间
					if(j==1){
						while(true){
							min++;
							if(min%15 == 0 &&
						   		(min - Number(timeArr[0].split(':')[1]))>= deliverTime){
						   		if(min >= 60){
						   			hour++;
						   			min = min-60;
						   			time = hour+':'+ min;
									timeArr.push(time);
									j++;
									break;
						   		}else{
						   			min = min;
						   			time = hour+':'+min;
									timeArr.push(time);
									j++;
									break;
						   		}
							}
						}
					}
					if((min+step) >= 60){
						hour++;
						min = min+step-60;
						time = hour+':'+ min;
						timeArr.push(time);
						j++;
					}else{
						min = min + step;
						time = hour+':'+min;
						timeArr.push(time);
						j++;
					}
					// 最大配送时间是22:15;
					if(hour == 22 && min >= 15){
						break;
					}
				}
				// 分钟是单位数加零
				let newArr = [];
				timeArr.forEach((t)=>{          
					if(t.split(':')[1].length==1){
						t = t.split(':')[0]+":0"+t.split(':')[1];
					}
					newArr.push(t);
				})
				return newArr;
			},

			// 显示选择时间框
			showBox(){
				this.showTime = true;
				document.body.style.overflow='hidden';
				this.$refs.time.addEventListener('click', ()=>{
					this.showTime = false;
					document.body.style.overflow='scroll';
				});
			},

			// 选择送餐时间
			chooseTime(index){
				this.timeIndex = index;
				this.showTime = false;
				document.body.style.overflow='scroll';
			}
		},
		computed:{
			totalFee(){
				let fee = 0;
				this.$store.state.order['$'+this.$store.state.restaurant.id].forEach((o) => {
					fee += o.qty*o.price;
				});
				fee +=this.$store.state.order['$'+this.$store.state.restaurant.id][0].deliverFee;
				return fee;
			}
		}
	}
	
</script>

<style scoped lang="scss">
	@import '../style/mixin.scss';
	.order{
		min-height: 100vh;
		position: relative;
		.tag{
			padding:0 .05rem;
			text-align:center;
			background:white;
			color:#3190e8;
			margin-right: .1rem;
			font-size: .5rem;
		}
		.address{
			font-size: .6rem;
			line-height: 1.2rem;
			.person_info{
				font-size: .5rem;
			}
			img{
				width: .5rem;
			}
			
		}
		.top{
			background: $color;
			font-size: .7rem;
			color: white;
			padding-bottom: .6rem;
			position: relative;
		}

		.top1{
			background: $color;
			font-size: .7rem;
			color: white;
			padding: .7rem 0;
			@include flex(center);
			position:fixed;
			top: 0;
			width: 100%;
			img{
				width: .7rem;
			}
			.goback{
				position: absolute;
				top: .8rem;
				left: 1rem;
			}

		}

		.word{
			text-align: center;
			line-height: 2.4rem;	
			img{
				width: .7rem;
				height: .7rem;
				position: fixed;
				top: .8rem;
				left: 1rem;
			}
		}

		.add{
			margin: 1rem auto 0;
			padding: .3rem .4rem;
			border: .05rem solid white;
			border-radius: .8rem;
			font-size: .6rem;
			width: 6rem;
			position: relative;
			img{
				width: .6rem;
			}
		}

		.main{
			margin-bottom: 2.2rem;
			@include padding(.4rem .4rem .8rem);
			font-size: .7rem;
			.info{
				background: white;
				margin-bottom: .4rem;
				border-radius:.2rem;
				.arrive_item, .payment{
					@include flex(space-between);
					line-height: 2.5rem;
					@include padding(0 .4rem);
					img{
						width: .5rem;
					}
				}
				.arrive_item{
					border-bottom: .05rem solid #eadede;
				}

			}

			.food_detail{
				background: white;
				margin-bottom: .4rem;
				font-size: .6rem;
			 	@include padding(.4rem);
				.restaurant{
					@include flex(space-between);
					margin: 1rem 0;
					.line{
						width: 3.5rem;
						height: .05rem;
						border-top: .15rem double #eadede;
					}
				}

				.food_bottom{
					@include padding(0 .3rem);
				}

				.food_item{
					@include flex(space-between);
					line-height:2rem;
					border-bottom: 1px solid #eadede;
					.right{
						width: 4rem;
						@include flex(space-between);
					}
				}

				.deliver_fee{
					@include flex(space-between);
					line-height: 2rem;
					border-bottom: .15rem double #eadede;
				}

				.gift{
					@include flex(space-between);
					line-height: 2rem;
					border-bottom: .15rem double grey;
					img{
						width: .5rem;
						margin-left: .2rem;
					}
				}

				.total{
					@include flex(space-between);
					line-height: 2.3rem;
				}
			}

			.preference, .ticket{
				font-size: .6rem;
				@include flex(space-between);
				line-height: 2rem;
				border-bottom: .05rem solid #eadede;
				background: white;
				@include padding(0 .8rem);
				img{
					width: .5rem;
				}
			}
		}

		.bottom{
			position: fixed;
			bottom: 0;
			left: 0;
			line-height: 2.2rem;
			@include flex;
			width: 100%;
			.bottom_left{
				background: #445147;
				color: white;
				@include prix(flex, 1);
				text-align: left;
				height: 2.2rem;
				@include padding(0  0 0 .4rem);
				@include flex;
			}
			.bottom_right{
				background: #4cd964;
				color: white;
				font-size: .7rem;
				width: 5rem;
				height: 2.2rem;

			}
		}

		.time{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			background-color: rgba(0,0,0,.4);
			z-index: 2;
		}

		.timeBox{
			background-color: white;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			font-size: .6rem;
			z-index: 2;

			.time_title{
				line-height: 2rem;
				background-color: $bg;
			}

			.time_list{
				
				@include flex;
				align-items:start;
				.time_left{
					width: 4.5rem;
					height: 40vh;
					background-color: $bg;
					font-size: .5rem;
					.weekday{
						background-color: white;
						line-height: 2rem;
					}
				}
				.time_right{
					height: 40vh;
					overflow: scroll;
					@include prix(flex,1);
					font-size: .3rem;
					.time_item{
						line-height: 2.5rem;
						border-bottom: 1px solid #eadede;
						text-align: left;
						@include padding(0 0 0 .8rem);
						position: relative;
						img{
							width: .8rem;
							position: absolute;
							right: .4rem;
							top: calc(50% - .4rem);
						}
					}
				}
			}
		}

		.timeBox-enter-active, .timeBox-leave-active{
			transition: .2s ease-in;
		}
		.timeBox-enter, .timeBox-leave-active{
			transform: translateY(100%);
		}
		
	}

	

</style>