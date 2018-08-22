import $http from 'axios';
let url = 'http://cangdu.org:8001/';

// 当前城市
export const currentCtiy = $http.get(url+'v1/cities?type=guess');

// 热门城市
export const hotCity = $http.get(url+'v1/cities?type=hot');

// 所有城市
export const groupCity = $http.get(url+'v1/cities?type=group');

// 根据经纬度定位
export const position = (geohash)=> $http.get(url+'v2/pois/'+ geohash);

// 食品分类列表
export const list  = $http.get(url+'v2/index_entry');

// 获取商铺列表
export const restaurants = (latitude,longitude) => $http.get(url+`shopping/restaurants?latitude=${latitude}&longitude=${longitude}`);

// 搜索餐馆
export const search = (geohash,keyword) => $http.get(url+`v4/restaurants?geohash=${geohash}&keyword=${keyword}`);

// 餐馆详情
export const detail = (id) => $http.get(url+`shopping/restaurant/${id}`);

// 获取食品列表
export const food = (id) =>　$http.get(url+`shopping/v2/menu?restaurant_id=${id}`);

// 获取评价分数
export const evalueScore = (id)=>$http.get(url+`ugc/v2/restaurants/${id}/ratings/scores`);

// 评价分类
export const evalueTpyes = (id)=>$http.get(url+`ugc/v2/restaurants/${id}/ratings/tags`);

// 获取评价信息
export const evalueMsgs = (id)=>$http.get(url+`ugc/v2/restaurants/${id}/ratings?limit=10`);

// 获取验证码
export const captchas = ()=> $http.post(url+'v1/captchas',{});

// 登录
export const login = (username,password,captcha_code) => $http.post(url+`v2/login`,{username, password, captcha_code});

// 添加地址
export const add = (userid,args) => $http.post(url+`v1/users/${userid}/addresses`,args);

// 获取收货地址列表
export const addresses = (userid) => $http.get(url+`v1/users/${userid}/addresses`);

// 删除收货地址
export const delAddress = (addressid,userid) => $http.delete(url+`v1/users/${userid}/addresses/${addressid}`);

// 获取备注选项
export const remarks = () => $http.get(url + 'v1/carts/1/remarks');