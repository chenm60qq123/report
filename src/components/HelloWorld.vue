<template>
  <div class="hello">
    <!-- <button @click="arr.push({name:'333'})">12123</button>
    <div v-for="(item,index) in arr"
         :key="index">{{item.name}}</div>
    <kd-echarts :option="option"
                style="height:500px"></kd-echarts> -->
    <el-button type="text"
               @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import kdEcharts from './kd-echarts/index';
export default {
  name: 'HelloWorld',
  components: { kdEcharts },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dialogVisible: false,
      arr: [{
        name: "123123"
      }],
      option: {
        name: '1',
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    }
  },
  mounted () {

  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    }
  }
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
