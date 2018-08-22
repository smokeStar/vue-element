<template>
    <div class="lazy">
    	<div class="item" v-for="item in list">
    		<img v-lazy="item.url" :alt="item.name">
    		<div class="text">{{ item.name }}</div>
    	</div>
    </div>
</template>

<script>
export default {
	data(){
		return{
			list : [
				{ name : "图片测试1", url : "12312" },
				{ name : "图片测试2", url : "http://img.taopic.com/uploads/allimg/120727/201995-120HG1030762.jpg" },
				{ name : "图片测试3", url : "http://img.zcool.cn/community/010a1b554c01d1000001bf72a68b37.jpg@1280w_1l_2o_100sh.png" },
				{ name : "图片测试4", url : "http://img.zcool.cn/community/010a1b554c01d1000001bf72a68b37.jpg@1280w_1l_2o_100sh.png" },
				{ name : "图片测试5", url : "http://img07.tooopen.com/images/20170316/tooopen_sy_201956178977.jpg" }
			]
		}
	}
    
}
</script>

<style scoped  lang="scss">
@import "../style/mixin.scss";
.lazy{
	height: 100%;
	min-height: 100vh;
	@include padding(.5rem);
}

.item{
	height: 6rem;
	line-height: 6rem;
	border-bottom: 1px solid #ccc;
	@include padding(.3rem);
	@include flex;
	img{
		width: 5rem;
		height: 5rem;
		margin-right: .8rem;
	}
	.text{
		font-size: .8rem;
		height: .9rem;
		line-height: .9rem;
	}
}


</style>
