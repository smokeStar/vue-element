<template>
  <div class="starBox">
    <span class="star" v-for="s in getStar(rating)">
        <img src="../images/star-full.svg" alt=""  v-if="s==1" >
        <img src="../images/star_half.svg" alt=""  v-if="s==2">
     </span>
  </div>

</template>

<script>
	export default {
		  props:['rating'],
      methods:{
        getStar(num){       // 动态加载星星评分
          num = Number(num);
          let arr =[];
          while(num>0){
            num--;
            if(num<0){
              arr.push(2)
            }else{
              arr.push(1);
            }
          }
          return arr;
        }
      }
	}
</script>

<style lang="scss" scoped>
  @import '../style/mixin';
  .starBox{
    @include flex;
    img{
      width:.5rem;
    }
  }

</style>
