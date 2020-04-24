<template>
  <div ref="echart"
       class="chart"></div>
</template>
<script>
let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line')
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
// require('echarts/lib/component/legend')
// require('echarts/lib/component/legendScroll')
export default {
  props: {
    option: Object
  },
  data () {
    return {
      chart: null,
    }
  },
  methods: {
    init () {
      this.chart = echarts.init(this.$refs.echart);
      this.chart.setOption(this.option);
    }
  },
  mounted () {
    // console.error(this.option)
    // if (this.option.name == '1') {
    //   console.error('init')
    //   require('echarts/lib/chart/line')
    // }

    this.init();

  },
  beforeUpdate () {
    console.error('update')
  },
  updated () {
    console.error('update')
  }
}
</script>
<style  scoped>
.chart {
  height: 100%;
  width: 100%;
}
</style>