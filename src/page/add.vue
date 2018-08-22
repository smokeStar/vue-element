<template>
	<div class="add">
		<div class="top">
			<div class="word">
				<img src="../images/back.svg"  @click="$router.go(-1)">
				<div class="arrive">新增地址</div>
			</div>
		</div>
		<forms :info="flied" class="forms"></forms>
		<div class="submit" @click="submit">确 定</div>
	</div>
</template>

<script>
	import forms from '../components/form.vue';
	import { add } from '../service/getData.js';
	export default{
		data(){
			return {
				flied:{	
						name			: '文健'
					,	sex 			: null
					,	phone 			: '18575598470'
					,	address 		: '硅谷动力'
					,	address_detail  : '1618室'
					,	tag   			: ''
					,	geohash   		: '22.65894,114.00153'
					,	phone_bk   		: '110'
					,	tag_type   		: 2
					,	poi_type   		: 1
				}
			}
		},
		methods:{
			submit(){
				add(Number(this.$store.state.userId), this.flied).then((res)=>{
					if(forms.methods.valid(this.flied)){
						return alert(forms.methods.valid(this.flied));
					} 
					if(res.data.status == 1){
						this.$router.go(-1);
					}
				})
			}

		},
		components:{
			forms
		}
	}


	
</script>

<style scoped lang="scss">
	@import '../style/mixin.scss';
	.add{
		height: 100vh;
	}
	
	.top{
		background: $color;
		font-size: .7rem;
		color: white;
		margin-bottom: .5rem;
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
	.forms{
		margin-top: 2.4rem;
	}
	
	

</style>