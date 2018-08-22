import mToast 	from './toast.vue';
import mConfirm from './confirm.vue';
import mAlert   from './alert.vue';
import { Bus }  from "./bus.js";

export default{
	install(Vue, options){

		const vueToast   = Vue.extend(mToast);
		const vueConfirm = Vue.extend(mConfirm);
		const vueAlert   = Vue.extend(mAlert);

		let toast, confirm, malert, timer;

		// 短暂提示框
		function $toast(info){

			if(!toast){
				toast = new vueToast();
				toast.$mount();
				document.body.appendChild(toast.$el);
			}

			toast.info = info;
			toast.showToast();

			if(timer){
				clearTimeout(timer);
			}else{
				timer = setTimeout(()=>{toast.hideToast()},2500)
			}
		}

		// 确认框
		function $confirm(info){
			return new Promise((resolve, reject)=>{
				if(!confirm){
					confirm = new vueConfirm();
					confirm.$mount();
					document.body.appendChild(confirm.$el);
				}
				confirm.info   = info;
				confirm.show   = true;

				Bus.$on('confirm_ensure',()=>{
					resolve();
				});

				Bus.$on('confirm_cancle',()=>{
					reject();
				});
			})
		}

		// 警告框
		function $alert(info){
			if(!malert){
				malert = new vueAlert();
				malert.$mount();
				document.body.appendChild(malert.$el);
			}
			malert.info   = info;
			malert.show   = true;
		}

		Vue.prototype.$toast   = $toast  ;
		Vue.prototype.$confirm = $confirm;
		Vue.prototype.$alert   = $alert  ;

	}
}