<template>
	<div class="remark">
		<div class="top">
			<div class="word">
				<img src="../images/back.svg"  @click="$router.go(-1)">
				<div class="arrive">订单备注</div>
			</div>
		</div>
		<div class="cupboard">
			<div class="title">
				<span class="num">餐具份数</span>
				<span>饿了么呼吁您参加 [ 无餐具 更环保 ] 行动</span>
			</div>
			<div class="box">
				<div class="green" @click="cupNum = 'no'" :class="{on : cupNum == 'no'}">毋需餐具</div>
				<div class="scrollBox"  >
					<div class="item" v-for="item in cupboards" 
						 @click="cupNum = item" :class="{on : cupNum == item}">{{ item }}</div>
				</div>
			</div>
		</div>
		<div class="flavor">
			<div class="title">口味偏好</div>
			<div class="flavorBox">
				<div class="flavors"  v-for="f in flavor">
					<div class="flavorItem" v-for="item,index in f"
					  @click=" choose(f,item)" :class="{on : map[item] == true}">{{ item }}</div>
				</div>
				
			</div>
			<textarea v-model="text" name="" maxlength="50" id="" cols="30" rows="10" placeholder="请输入备注内容 (可不填)" class="text">
			</textarea>
			<div class="tips">{{ text.length }} / 50个字</div>
		</div>
		<div class="submit">确 定</div>

	</div>
	
</template>

<script>
	import { remarks } from '../service/getData.js';
	export default{
		data(){
			return {
				cupboards : [1,2,3,4,5,6,7,8,9,10,'10份以上'],
				flavor    : [],
				text      : '',
				cupNum    : '',
				prefer    : '',
				map       : {}
			}
		},
		created(){
			remarks().then((res) => {
				this.flavor = res.data.remarks;
				this.map = {};
				this.flavor.forEach((f)=>{
					f.forEach((item)=>{
						this.$set(this.map, item, false);
					})
				})
				console.log(this.map);
			})
		},
		methods:{
			choose(arr,item){
				arr.forEach((a)=>{
					a==item ? this.map[item]=!this.map[item] :this.map[a]=false;
				})
			}
		}
	}


	
</script>

<style scoped lang="scss">
	@import '../style/mixin.scss';
	.remark{
		height: 100vh;
		font-size: .6rem;
		@include padding(2.9rem 0 0 0);
	}
	.cupboard{
		margin: 0 0 .6rem;
		background-color: white;
		@include padding(0 .6rem );

		.title{
			line-height: 2rem;
			text-align: left;
			.num{
				font-size: .7rem;
				margin-right: .4rem;
				color: black;
			}
			span{
				font-size: .5rem;
				color: grey;
			}
		}

		.box{
			@include flex;
			height: 3rem;
			.green{
				font-size: .5rem;
				color: grey;
				padding: .3rem .4rem;
				margin-right: .5rem;
				border: 1px solid $border;
				border-radius: .2rem;

			}
			.scrollBox{
				@include prix(flex, 1);
				border: 1px solid $border;
				padding: .2rem;
				border-radius: .2rem;
				font-size: 0;
				overflow:scroll;
				white-space: nowrap;
				font-size: .4rem;
				color: grey;
				.item{
					font-size: .6rem;
					width: 16.3%;
					text-align: center;
					line-height: 1rem;
					border-right: 1px solid $border;
					display: inline-block;
					border-radius: .1rem;
				}
				.item:last-child{
					width: 3rem;
					border: none;
				}
			}
		}
	}

	.flavor{
			background-color: white;
			@include padding(.6rem);
			text-align: left;
			position: relative;
			.title{
				font-size: .6rem;
				line-height: 2rem;
				text-align: left;
				color: black;
			}
			.flavors{
				font-size: 0;
				color: grey;
				border-radius: .2rem;
				margin-right: .4rem;
				border: 1px solid $border;
				height: 1.3rem;
				display: inline-block;
				margin-bottom: .4rem;
				.flavorItem{
					font-size: .5rem;
					display: inline-block;
					text-align: center;
					width: 2.5rem;
					line-height: 1.3rem;
					border-right: 1px solid $border;
				}
			}

			.text{
				width: 100%;
				background-color: #f3f3f3;
				font-size: .4rem;
				height: 5rem;
				@include padding(.4rem);
				color: grey;
				resize:none 
			}
			.text::-webkit-input-placeholder {
    			color: grey;
    			font-size: .5rem;
    			border-radius: .2rem;
			}

			.tips{
				font-size: .4rem;
				color: grey;
				position: absolute;
				bottom: 1.2rem;
				right: 1.2rem;
			}
		}
	.submit{
		width: 95%;
		line-height: 2rem;
		color: white;
		margin: .6rem auto;
		background-color: #21c621;
		border-radius: .1rem;
		font-size: .8rem;
	}

	.on{
		background-color: $color!important;
		color: white !important;
	}
	

</style>
