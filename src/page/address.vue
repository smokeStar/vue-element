<template>
	<div class="address">
		<div class="top">
			<div class="word">
				<img src="../images/back.svg"  @click="$router.go(-1)">
				<div class="arrive">收货地址</div>
			</div>
		</div>
		<div class="adds">
			<div class="add_item" v-for="item, index in address">
				<div class="add_left">
					<img src="../images/yes.svg" alt="" class="yes" v-show="index == addIndex">
				</div>
				<div class="add_right">
					<div class="info" @click="chooseAdd(index)">
						<div class="add_top">
							<span class="label">{{ item.tag }}</span>
							{{item.address}} {{ item.address_detail }}
						</div>
						<div class="add_bottom">
							<span class="name">{{item.name}} {{item.sex==1&&'先生'||'女士'}}</span>
							<span class="tel">{{item.phone}}</span>
						</div>
					</div>
					
					<img src="../images/delete.svg" alt="" class="edit"
						 @click="del(item.id, index)">
				</div>
			</div>
		</div>

		<div class="bottom" @click="$router.push('/add')">
			<img src="../images/adda.svg">
			<div>新增地址</div>
		</div>
	</div>
</template>

<script>
	import { addresses, delAddress } from '../service/getData.js';

	export default{
		data(){
			return{
				address  :[],
				addIndex : localStorage.getItem('index')
			}
		},
		activated(){
			this.getAddress();
		},
		methods:{
			getAddress(){
				addresses(Number(this.$store.state.userId)).then((res) => {
					if(res.data.status) return alert(res.data.message);
					this.address = res.data;
				});
			},
			chooseAdd(index){
				if( index == this.addIndex) return;
				this.addIndex = index;
				localStorage.setItem('index', this.addIndex);
				this.$router.push('/confirm');
			},
			del(id, index){
				delAddress(id, this.$store.state.userId).then((res) => {
					if(res.data.status == 1) this.getAddress();
					if(this.addIndex == index)localStorage.removeItem('index');
				})
			}
		}
	}


	
</script>

<style scoped lang="scss">
	@import '../style/mixin.scss';
	.address{
		height: 100vh;
		overflow: scroll;
	}
	

	.adds{
		margin: 2.9rem 0 2.2rem 0;
		background-color: white;
		.add_item{
			@include padding(.7rem .5rem );
			@include flex;
			font-size: .6rem;
			text-align: left;
			.add_left{
				width: 1.5rem;
				line-height: 3rem;
			}
			.add_right{
				@include prix(flex, 1);
				@include flex;
				line-height: 1.2rem;
				position: relative;
				.add_top{
					overflow:hidden;
                    text-overflow:ellipsis;
                    display:-webkit-box;
                    -webkit-line-clamp:2;
                    -webkit-box-orient:vertical;
				}
				.label{
					padding: .05rem .4rem;
					border: 1px solid orange;
					color: orange;
					border-radius: .1rem;
					margin-right: .1rem;
				}
				.name, .tel{
					font-size: .5rem;
					color: grey;
				}
				.tel{
					margin-left: .5rem;
				}
			}
			.edit{
				position: absolute;
				top: calc(50% - .5rem);
				right: 0;
			}
			.info{
				width: 90%;
			}
		}

		img{
			width: 1rem;
		}
		
	}
	.bottom{
		line-height: 2.2rem;
		color: #2781d7;
		position: fixed;
		bottom: 0;
		left: 0;
		font-size: .7rem;
		background-color: white;
		width: 100%;
		@include flex(center);
		img{
			width: .9rem;
			margin-right: .3rem;
		}
	}
	
	

</style>