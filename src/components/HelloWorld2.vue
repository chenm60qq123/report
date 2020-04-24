<template>
  <div class="hello">
    <div>123123</div>
    <kd-echarts :option="option"
                style="height:500px"></kd-echarts>
  </div>
</template>

<script>
import kdEcharts from './kd-echarts-copy/index';
export default {
  name: 'HelloWorld2',
  components: { kdEcharts },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      option: {
        name: '2',
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [1820, 1932, 1901, 1934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    }
  },
  mounted () {

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
