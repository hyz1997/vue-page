在这个demo中，我用vue对一个json文件中的数据进行了简单的分页，没用用到交互，一下是我的实现过程。

### 基础逻辑
1.将json文件引入app.vue,并作为data返回

```
data(){
      var testData = require("../test.json");
      return {testData}
    },
```
2.将testData使用v-for呈递在页面上

```
<table>
      <tr v-for="(item,index) in testData">
        <td v-for="items in item">
          {{items}}
        </td>
      </tr>
    </table>
```
3.用v-if判断显示条数

```
<table>
      <tr v-for="(item,index) in testData" v-if="index>=0&&index<10">
        <td v-for="items in item">
          {{items}}
        </td>
      </tr>
    </table>
```
4.我考虑到vue双向数据绑定的特点，所以想到改变v-if中大于和小于两个值就可以实现分页了，所以我把这两个值改成了变量，通过点击上一页下一页改变变量的值。

```
<table>
      <tr v-for="(item,index) in testData" v-if="index>=begin&&index<end">
        <td v-for="items in item">
          {{items}}
        </td>
      </tr>
</table>
<input type="button" value="上一页" @click="decrement">
<input type="button" value="下一页" @click="increment">
```
5.我开始直接把decrement和increment函数放在方法里面，结果发现根本改变不了begin和end的值。于是我用了vuex.
store.js
```
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
```
main.js

```
import Vue from 'vue'
import App from './App.vue'
import store from './store'

new Vue({
  store,
  el: '#app',
  render: h => h(App)
})

```
app.vue

```
<template>
  <div id="app">
    <input type="button" value="上一页" @click="decrement">
    <button>第{{end/10}}页</button>
    <input type="button" value="下一页" @click="increment">
    <table>
      <tr v-for="(item,index) in testData" v-if="index>=begin&&index<end">
        <td v-for="items in item">
          {{items}}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  export default {
    data(){
      var testData = require("../test.json");
      return {testData}
    },
    computed:mapGetters([//管理所有的事件
      'begin',
      'end'
    ]),
    methods:mapActions([//获取数据
      'increment',
      'decrement',
      'clickOdd',
      'clickAsync'
    ])
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

```

这样，一个简单的分页就实现了

