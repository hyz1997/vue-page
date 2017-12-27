import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
var state = {
	front:0,
	count:10
};//设置初始数字

const mutations = {
	increment(state) {//处理数据变化的函数
		state.front = state.front+10;
		state.count=state.count+10;
	},
	decrement(state) {
		state.front = state.front-10;
		state.count=state.count-10;
	}
};

const actions =  {//处理你要干什么
	increment:({commit})=> {
		commit('increment');
	},
	decrement:({commit}) => {
		commit('decrement');
	},
	clickAsync: ({commit}) => {
		new Promise((resolve) => {
			setTimeout(function(){
				commit('increment');
				resolve();
			},1000);
		})
	}
}

const getters = {
	begin(state) {
		return state.front;
	},
	end(state) {
		return state.count;
	}
};

//需要导出Store对象
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
});