<template>
	<div class="form">
		<div class="person">
			<div class="label">联系人</div>
			<div class="input">
				<input type="text" placeholder="姓名" v-model='info.name' autofocus>
				<div class="buttons">
					<div @click="info.sex = 1" :class="{ on: info.sex=='1'}">先生</div>
					<div @click="info.sex = 2" :class="{ on: info.sex=='2'}">女士</div>
				</div>
			</div>
		</div>
		<div class="tel">
			<div class="label">电话</div>
			<input type="text" placeholder="手机号码" v-model="info.phone">
			
		</div>
		<div class="address">
			<div class="label">地址</div>
			<input type="text" placeholder="选择收货地址" v-model="info.address">
		</div>
		<div class="detail">
			<div class="label">门牌号</div>
			<input type="text" placeholder="例: 5号楼203室" v-model="info.address_detail">
		</div>
		<div class="label">
			<div class="labels">标签</div>
			<div class="buttons">
				<div @click="info.tag = 'home'" :class="{ on: info.tag=='home'}">家</div>
				<div @click="info.tag ='company'" :class="{on: info.tag=='company'}">公司</div>
				<div @click="info.tag = 'school'" :class="{ on: info.tag=='school'}">学校</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	export default{
		props:['info'],
		methods:{
			valid(obj){
				let form = {
						sex   			:   '性别'
					,	name  			:   '姓名'
					,	address 		:   '地址'
					,	tag  			:   '标签'
					,	address_detail  :   '详细地址'
					,	phone  			:   '手机号'
				}
				for(let key in obj){
					if(!obj[key]) return `${form[key]}不能为空!`
				}
				let reg = new RegExp(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/);
				if(!reg.test(obj['phone'])) return '手机号格式不正确!';
			}
		}
	}

	
</script>

<style scoped lang="scss">
	@import '../style/mixin.scss';
	.form{
		background-color: white;
		@include padding(0  0 0 .5rem);
		width: 100%;
		font-size: .6rem;
	}

	.form>div{
		@include flex;
		@include prix(align-items, start);
		line-height: 2.5rem;
		border-bottom: 1px solid $border;

	}

	.form>div>div:first-child{
		width: 3.5rem;
		text-align: left;
	}

	.form input{
		border: none;
		font-size: .6rem;
		outline: none;
		background-color: transparent;
		width:100%;
		line-height: 2.5rem;
	}

	.person{
		.label{
			width: 3rem!important;
		}
		.input{
			@include prix(flex, 1);
			input{
				border-bottom: 1px solid $border;
			}
			
		}
	}
	.buttons{
		line-height: 2.5rem;
		height: 2.5rem;
		@include flex(start);
		div{
			@include padding(.1rem 1rem);
			border: 1px solid $border;
			line-height: 1.25rem;
			margin-right: .5rem;
			border-radius: .2rem;
		}
	}
	input::-webkit-input-placeholder{
		color: gainsboro;
    }

	.on{
		border: 1px solid green !important;
		color: green;
	}
    


</style>