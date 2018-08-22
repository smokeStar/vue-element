<template>
  <div class="dropEl">
    <transition name="drop"
                v-for="item, index in balls" :key="index"
                @before-enter ='beforeEnter'
                @after-enter = 'afterEnter'
    >
      <div class="dropBox"  v-if="item['$'+index]">
        <div class="dropBall"></div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {bus} from './common/bus'
	export default {
		  data(){
		  	  return {
		  	  	  balls:[{'$0':false}],
              elLeft : 0,
              elTop  : 0,
              windowHeight : 0,
              count  : 0
          }
      },
      mounted(){
		  	  this.windowHeight = window.innerHeight;
		  	  bus.$on('drop',(left,top)=>{
              this.elLeft = left;
              this.elTop = top;
              this.balls[this.count]['$'+this.count] = true;
              let ballObj = {};
              ballObj['$'+(this.count+1)] = false;
              this.balls.push(ballObj);
              this.count++;
          })
      },
      methods:{
        beforeEnter(el){
            el.style.transform = `translate3d(0,${this.elTop-this.windowHeight-50}px,0)`;
            el.children[0].style.transform = `translate3d(${this.elLeft }px,0,0)`;
            el.children[0].style.opacity = 0;
        },
        afterEnter(el){
            el.style.transform = `translate3d(0,-4rem,0)`;
            el.children[0].style.transform = `translate3d(2rem,0,0)`;
            el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
            el.children[0].style.transition = 'transform .55s linear';
            el.children[0].style.opacity = 1;
            this.balls[this.count-1]['$'+(this.count-1)] = false;
        }
      }

	}
</script>

<style lang="scss" scoped>
    .dropEl{
      position: absolute;
      bottom:0;
      left:0;
      z-index: 2;
    }
    .dropBall{
      width: .6rem;
      height:.6rem;
      -webkit-border-radius:50%;
      -moz-border-radius:50%;
      border-radius:50%;
      background-color: red;
      position: absolute;
    }
</style>
