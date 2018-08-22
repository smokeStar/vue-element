<template>
	<div class="login">
		<header>
			<img src="../images/back.svg" width=".8rem" @click="$router.go(-1)">
      		<div style="font-size: .9rem;font-weight: 600"> 登录 </div>
      		<div style="font-size:.8rem;">手机登录</div>
		</header>
		<div class="box">
			<div class="account">
				<input type="text" placeholder="账号" v-model="account">
			</div>
			<div class="password">
				<input type="password" placeholder="密码" v-if="!show" v-model="password">
				<input type="text" placeholder="密码" v-else v-model="password">
				<div class="switch" @click="show = !show">
					<img src="../images/closeeye.svg" alt="" v-if="!show">
					<img src="../images/open.svg" alt="" v-else>
				</div>
			</div>
			<div class="check">
				<input type="text" placeholder="验证码" v-model="check">
				<div class="picCheck">
					<img :src="capt" >
					<div>
						<div style="color:#6ed837;cursor:pointer;" @click="getCap">换一张</div>
					</div>
				</div>
			</div>
		</div>
		<div class="tips">
			温馨提示: 未注册饿了么账号的手机号, 登录时将自动注册, 且代表你已经同意《用户服务协议》
		</div>
		<div class="submit" @click="submit">登录</div>
		
	</div>

</template>

<script>

import { captchas, login } from '../service/getData.js';
 	export default {
		data () {
			return {
				show	: 	false,
				capt    :   null,
				account :   null,
				password:   null,
				check   :   null
			}
		},
		created(){
			this.getCap();
		},
		methods:{
			// 获取图片二维码
			getCap(){
				captchas().then((res)=>{
					this.capt = res.data.code;
				})
			},
			// 登录	
			async submit(){
				let information = {
						'账号'	: this.account
					,	'密码'  : this.password
					,	'验证码': this.check,
				}
				if(this.valid(information)) return alert(this.valid(information));
				
				let res = await login(this.account, this.password, this.check);
				if(res.data.status == 0) return alert(res.data.message);
				this.$store.state.userId = res.data.user_id;                // 保存用户id
				localStorage.setItem('userid', this.$store.state.userId);
				this.$store.state.isLogin = true;                           // 保存是否登录信息
				sessionStorage.setItem('login',this.$store.state.isLogin);
				this.$router.replace('/confirm');
			},
			// 验证表单
			valid(obj){
				for(let key in obj){
					if(!obj[key]) return `${key}不能为空!`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '../style/mixin.scss';
.login{
	height: 100vh;
	input{
		width: 100%;
		height: 100%;
		outline: none;
		border: none;
		background-color: transparent;
		font-size: .7rem;
	}

	.box{
		margin: .7rem 0;
		background-color: white;
		font-size: .7rem;

		.account,.password,.check{
			height: 2.2rem;
			width: 100%;
			border-bottom: .005rem solid #c6bbbb;
			color: #555;
			position: relative;
			@include padding(0 .5rem);
		}

		.switch{
			position: absolute;
		    right: .4rem;
		    top: 50%;
		    margin-top: -.35rem;
		    width: .7rem;
		    height: .7rem;
		    img{
		    	width: 100%;
		    }
		}

		.picCheck{
			position: absolute;
		    @include flex(space-between);
		    font-size: .6rem;
		    right: .4rem;
		    top: 0;
		    height: 100%;
		    width: 5rem;
		    img{
		    	width: 2.5rem;
		    }
		}
	}

	.tips{
			font-size: .6rem;
			text-align: left;
			@include padding(0 .3rem);
			line-height: 1rem;
			margin-bottom: .7rem;
	}

	.submit{
		line-height: 2rem;
		background-color: #65c03e;
		margin: 0 .3rem;
		color: white;
		font-size: .9rem;
		border-radius: .1rem;
	}

}


</style>
