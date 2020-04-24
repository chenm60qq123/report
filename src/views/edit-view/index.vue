<template>
  <div class="edit-content-body">
    <div class="edit-source-menu"
         v-scrollBar>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="资源"
                          name="1">
          <ul>
            <li v-for="(item,index) in sourceData"
                :key="index">
              <i class="iconfont"
                 draggable
                 v-html="item.icon"></i>
              <div>{{item.label}}</div>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title="资源"
                          name="1">
          <ul>
            <li v-for="(item,index) in sourceData"
                :key="index">
              <i class="iconfont"
                 draggable
                 v-html="item.icon"></i>
              <div>{{item.label}}</div>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="edit-content"
         draggable
         @drop="drop"
         @dragover.prevent>
      <div v-for="item in viewData"
           :key="item.id"
           :style="{'left':item.left,'height':item.height,'top':item.top}"
           class="view-box">1</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeNames: "1",
      sourceData: [
        {
          icon: '&#xe785;',
          label: "标题"
        }, {
          icon: '&#xe785;',
          label: "富文本"
        }, {
          icon: '&#xe785;',
          label: "图片"
        }, {
          icon: '&#xe785;',
          label: "视频"
        }
      ],
      viewData: [
        {
          id: "1",
          height: '100px',
          top: '100px',
          left: '100px'
        }
      ]
    }
  },
  methods: {
    drop (ev) {
      this.viewData.push(
        {
          id: "2",
          height: '200px',
          top: '200px',
          left: '200px'
        }
      )
    }
  }

}
</script>
<style lang="scss" scoped>
$icon-size: 36px;
.edit-content-body {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgb(243, 242, 242);
  >>> .el-collapse-item__header {
    padding-left: 20px;
    height: 30px;
    line-height: 30px;
    background-color: #526ca7;
  }
  >>> .el-collapse-item__arrow {
    margin: 0 15px 0 auto;
  }
  >>> .el-collapse-item__content {
    padding: 10px;
  }
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    line-height: $icon-size;
    justify-content: flex-start;
    li {
      padding: 8px 4px;
      cursor: pointer;
      font-size: 12px;
      line-height: 16px;
    }
  }
}
.edit-source-menu {
  border-right: 1px solid #ffffff;
  position: absolute;
  width: 200px;
  height: 100%;
  background-color: #364660;
  // overflow-y: auto;
}
.edit-content {
  position: absolute;
  left: 200px;
  width: calc(100% - 400px);
  height: 100%;
  background-color: #ffffff;
}
.iconfont {
  font-size: $icon-size;
  + div {
    width: $icon-size;
    text-align: center;
  }
}
.view-box {
  background-color: aqua;
  width: 200px;
  position: absolute;
}
</style>