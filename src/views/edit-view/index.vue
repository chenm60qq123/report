<template>
  <div class="edit-content-body">
    <div class="edit-source-menu"
         v-scrollBar>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="资源"
                          name="1">
          <ul>
            <li>
              <div>图片</div>
            </li>
            <li>
              <div>图片</div>
            </li>
            <li>
              <div>图片</div>
            </li>
            <li>
              <div>图片</div>
            </li>
            <li>
              <div>图片</div>
            </li>
            <li>
              <div>图片</div>
            </li>
            <li>
              <div>图片</div>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="edit-content">

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeNames: 1
    }
  }

}
</script>
<style lang="scss" scoped>
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
    justify-content: space-between;
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
</style>