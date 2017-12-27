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
