<template>
	<div class="order">
		<scroll class="scroll"
		 		ref="mscroll"
		        :pullDownRefresh="true" 
		        :pullUpLoad="true"
		        :probeType=3 
		        :scrollbar="true"
		        :data="list" 
		        @pullingUp="getData"
		        >
			<div slot="content" class="content1">
    			<div v-for="item in list">{{ item }}</div>
    		</div>

			<img class="loading" slot="pullingdown" src="../../static/loading.gif" alt="">
			<div class="text"    slot="pulldowned">刷新成功</div>

			<img class="loading" slot="pullUping" src="../../static/loading.gif" alt="">
			<div class="text"    slot="pullNone">没有更多数据了</div>
			<div class="text"    slot="beforePullUp">加载更多</div>
		</scroll>
		
	</div>
</template>

<script>
import scroll from '../components/common/scroll.vue';
export default {
	data(){
		return{
			list : [1528877669396,1528877669397,1528877669398,1528877669399],
			count : 0
		}
	},
	methods:{
		getData(){
			setTimeout(()=>{
				this.list.unshift(Number(new Date()));
				this.$refs.mscroll.finishPullDown();
			},2000);
		},
		loadMore(){
			let arr = [];

			if(this.count%2 == 0){
				arr = [Number(new Date())+10,Number(new Date())+11,Number(new Date())+20,Number(new Date())+30]
			}else{
				arr = []
			};

			setTimeout(()=>{
				this.list = this.list.concat(arr);
				this.$refs.mscroll.finishPullUp();
			},2000);
			this.count ++ ;
		}
	},
	components:{
		scroll
	}
}
</script>

<style lang="scss" scoped>
.scroll{
	height: 90vh;
	overflow: scroll;
}
.pulldown{
	background: white;
}
.loading{
	width: 50px;
	height: 50px;
}
.text{
	width: 100%;
	font-size: .8rem;
	text-align: center;
	background-color: white;
	height: 100%;
	line-height: 100px;
	color: black;
}
.content1{
	min-height: 90vh;
	width: 100%;
	z-index: 2;
	background-color: white;
	div{
		border-top: 1px solid #ccc;
		font-weight: 600;
		height: 100px;
		line-height: 100px;
	}
}
.content>div:last-child{
	border-bottom: 1px solid #ccc;
}

</style>
