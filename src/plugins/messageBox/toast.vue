<template>
    <transition name="fade">
    	<div class="toast" v-show="show && !!info">
    		{{ info }}
    	</div>
    </transition>
</template>

<script>
export default {
    data(){
    	return{
    		show : false,
    		info : ""
    	}
    },
    methods:{
    	showToast(){
    		this.show = true;
    	},
    	hideToast(){
    		this.show = false;
    	}
    }
}
</script>

<style scoped  lang="scss">

.fade-enter-active, .fade-leave-active{
    transition: all .5s linear;
}
.fade-enter{
    opacity:1;
}
.fade-leave-active{
    opacity:0;
}

.toast{
	width: 250px;
	height: 100px;
	line-height: 100px;
	text-align: center;
	text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: white;
    border-radius: 10px;
    position: absolute;
    font-size: 25px;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 99;
    background-color: rgba(0,0,0,.6);

}

</style>
