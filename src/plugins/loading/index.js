import mLoading from './loading.vue';

export default{
	install(Vue, options){

		// 创建扩展实例构造器, 也就是预设了部分选项的Vue的实例构造器;
		const vueLoading = Vue.extend(mLoading);  
		let loading = null;

		function $loading(){
			if(!loading){

				loading = new vueLoading(); // 创建实例
				loading.$mount();			// 挂载实例
				document.body.appendChild(loading.$el); 
			}
			loading.showLoading();
		}

		$loading.close = ()=>{
			if(!loading || !loading.show) return;
			loading.hideLoading();
		}
		Vue.prototype.$loading = $loading;
	}
}




