<!-- 下拉刷新上拉加载组件 -->
<template>
    <div class="scroll" ref="wrapper">
    	<div class="box">
    		<div class="pulldown" v-if='pullDownRefresh'  :style="{background:pullupColor}">
				<slot name="pullingdown" v-if='isPullingDown'></slot>
				<slot name="pulldowned"  v-if="afterPullDown"></slot>
	    	</div>
    		<slot name="content" class="content"></slot>
	    	<div ref="hash"></div>
    		<div class="pullup" v-if='pullUpLoad'  >
				<slot name="pullUping"     v-if='pullUping'></slot>
				<slot name="pullNone"      v-if="pullNone"></slot>
				<slot name="beforePullUp"  v-if="beforePullUp"></slot>
	    	</div>
    	</div>
    </div>
</template>

<script>

import Bscroll from 'better-scroll';

export default {
	data(){
		return{
			scroll : null,
			isPullingDown : false,
			afterPullDown : false,
			pullUping	  : false,
			pullNone      : false,
			beforePullUp  : true
		}
	},
	props:{
		data:{
			type    : Array,
			default : ()=>{
				return []
			}
		},
		pullupColor : {
			type : String,
			default : "#fff"
		},
		startX : {
			type    : Number,
			default : 0
		},
		startY : {
			type    : Number,
			default : 0
		},
		scrollX : {
			type    : Boolean,
			default : false
		},
		scrollY : {
			type    : Boolean,
			default : true
		},
		click : {
			type    : Boolean,
			default : false
		},
		tap : {
			type    : Boolean,
			default : false
		},
		bounce : {
			type    : Boolean,
			default : true
		},
		probeType : {
			type    : Number,
			default : 0
		},
		scrollbar : {
			type    : Boolean,
			default : false
		},
		pullDownRefresh : {
			type    : Boolean,
			default : false
		},
		pullUpLoad : {
			type    : Boolean,
			default : false
		}
	},
	methods:{
		initScroll(){

			if(!this.$refs.wrapper) return;

			let options = {
				tap				: this.tap,
				click   		: this.click,
				bounce  		: this.bounce,
				startX			: this.startX,
				startY  		: this.startY,
				scrollX			: this.scrollX,
				scrollY 		: this.scrollY,
				probeType       : this.probeType,
				pullUpLoad		: this.pullUpLoad && {threshold:100},
				pullDownRefresh : this.pullDownRefresh && {threshold:100, stop: 100}
			};

			this.scroll = new Bscroll(this.$refs.wrapper, options);

			this.pullDownRefresh && this.startPullDown();
			this.pullUpLoad && this.startPullUp();
		},
		startPullDown(){
			this.scroll.on('pullingDown', () => { 
         		this.isPullingDown = true;
         		this.$emit('pullingDown');
      		});  
		},
		finishPullDown(){
			this.isPullingDown = false;
			this.afterPullDown = true;
			setTimeout(()=>{
				this.scroll.finishPullDown();
				this.afterPullDown = false;
			},800)
		},
		startPullUp(){
			this.scroll.on('pullingUp', () => { 
				this.pullNone = false;
				this.pullUping = true; 
				this.beforePullUp = false;
         		this.$emit('pullingUp');
      		});  
		},
		finishPullUp(){
			console.log('finish');
			this.pullUping = false;
			this.beforePullUp = this.pullNone && false || true ;
			this.scroll.finishPullUp();
		},
		refresh() {
        	this.scroll && this.scroll.refresh();
      	},
      	scrollto(){
      		this.scroll && this.scroll.scrollto();
      	},
      	scrollToElement(el){
      		this.scroll && this.scroll.scrollToElement(el);
      	}
	},
	mounted(){
		this.$nextTick(()=>{
			this.initScroll();
		})
	},
	watch:{
		data(newVal, oldVal){
			if(newVal.length == oldVal.length ){
				this.pullNone = true;
				this.beforePullUp = false;
			}
			setTimeout(()=>{
				console.log('refresh');
				this.refresh();
			},1100)
		}
	}
}
</script>


<style scoped  lang="scss">
@import '../../style/mixin.scss';
.box{
	width: 100%;
	min-height: 101%;
	background-color: white;
	position: relative;
}
.pulldown{
	width: 100%;
	height: 100px;
	@include flex(center, center);
	position: absolute;
	top: -100px;
}
.pullup{
	width: 100%;
	height: 100px;
	@include flex(center, center);

}
</style>
