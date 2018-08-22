<template>
	<div class="alert" v-show="show && info">
		<transition name="top">
    		<div class="box" v-show="show && info">
	    		<div class="title">{{ title }}</div>
	    		<div class="content">{{ info }}</div>
	    		<div class="bottom">
	    			<div class="ensure" @click="ensure">确定</div>
	    		</div>
    		</div>
		</transition>
	</div>
</template>

<script>

export default {
	data(){
		return{
			show  : false,
			title : '提示',
			info  : ''
		}
	},
	methods:{
		ensure(){
			this.show = false;
		},
		hide(){
			this.show = false;
		},
		showAlert(){
			this.show = true;
		}
	}
}
</script>

<style scoped  lang="scss">
@import "../../style/mixin.scss";
.alert{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.6);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1000;
	@include flex(center, center);
	.box{
		border-radius: 10px;
		width: 80%;
		height: 350px;
		text-align: center;
		background-color: white;
		font-size: 35px;
		.title{
			line-height: 100px;
			font-weight: 600;
			width: 100%;
		}
		.content{
			width: 100%;
			line-height: 150px;
			color: #666;
		}
		.bottom{
			line-height: 100px;
			border-top: 1px solid #ccc;
			@include flex;
			.ensure{
				width: 100%;
				color: skyblue;
			}
		}

	}
	.top-enter-active, .top-leave-active{
		transition: transform .3s;
	}
	.top-enter{
		transform: scale(.6);
	}
	.top-leave-active{
		transform: scale(.6);
	}
}


</style>
