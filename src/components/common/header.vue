<template>
    <div class="head">
    	<div class="left">
    		<slot name="left"></slot>
    	</div>
    	<div class="middle">
    		<slot name="middle"></slot>
    	</div>
    	<div class="right">
    		<slot name="right"></slot>
    	</div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped  lang="scss">
@import '../../style/mixin.scss';

.head{
    height: 2.3rem;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	color: white;
	z-index: 99;
	background-color: #3190e8;
	@include padding(0 .5rem);
	@include flex(space-between, center);
}
.middle{
	font-size: .7rem;
    @include ellipsis;
    width: 50%;
}
.right{
	font-size: .7rem;
}

</style>
