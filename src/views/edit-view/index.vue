<template>
  <div class="edit-content-body">
    <div class="edit-source-menu" v-scrollBar>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="资源" name="1">
          <ul>
            <li v-for="(item,index) in sourceData" :key="index">
              <i class="iconfont" draggable v-html="item.icon" @drag="drag(item.type)"></i>
              <div>{{item.label}}</div>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title="资源" name="1">
          <ul>
            <li v-for="(item,index) in sourceData" :key="index">
              <i class="iconfont" draggable v-html="item.icon"></i>
              <div>{{item.label}}</div>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div
      class="edit-content"
      ref="edit-content"
      draggable="false"
      @drop="drop"
      @mouseup.prevent="viewBoxMoveUp"
      @click.self="clearSelect"
      @dragover.prevent="dragoverContent($event)"
    >
      <div
        v-for="item in viewData"
        :key="item.id"
        :style="{height:item.style.height+'px',width:item.style.width+'px',top:item.style.top+'px',left:item.style.left+'px',}"
        class="view-box"
        draggable="false"
        @mousedown.prevent="viewBoxMoveDown($event,item)"
        :class="(selectedBox && selectedBox.id==item.id)?'selected':''"
      >
        <div
          :ref="item.id"
          :id="item.id"
          :style="{height:item.style.height+'px',width:item.style.width+'px'}"
        ></div>
        <!-- <div>
          <div class="resizable">
            <div class="resize-node-common resize-node-left">
              <div class="resize-node-inner-k_HYF"></div>
            </div>
            <div class="resize-node-common resize-node-top">
              <div class="resize-node-inner-k_HYF"></div>
            </div>
            <div class="resize-node-common resize-node-bottom">
              <div class="resize-node-inner-k_HYF"></div>
            </div>
            <div class="resize-node-common resize-node-right">
              <div class="resize-node-inner-k_HYF"></div>
            </div>
            <div class="resize-node-common" style="top: -3px; right: -1px;cursor: nesw-resize;">
              <div class="resize-node-inner-k_HYF"></div>
            </div>
            <div class="resize-node-common" style="top: -3px; left: -3px;cursor:nw-resize;">
              <div class="resize-node-inner-k_HYF"></div>
            </div>
            <div class="resize-node-common" style="bottom: 4px; left: -3px;cursor:sw-resize;">
              <div class="resize-node-inner-k_HYF"></div>
            </div>
            <div class="resize-node-common" style="bottom: 4px; right: -1px;cursor:se-resize;">
              <div class="resize-node-inner-k_HYF"></div>
            </div>
          </div>
        </div>-->
        <box-resize-node :resizable.sync="resizable" v-if="selectedBox && selectedBox.id==item.id"></box-resize-node>
        <div class="draggable" v-if="selectedBox && selectedBox.id==item.id">
          <svg width="100%" height="100%" @mouseup="viewBoxMoveUp($event)" style="cursor: move;">
            <rect
              width="100%"
              height="100%"
              style="stroke-width:2;fill:none;stroke:rgb(0,0,0);cursor: move;stroke-dasharray='10,10'"
            />
          </svg>
        </div>
      </div>
      <div
        draggable="false"
        class="dotted-box"
        v-if="dottedBox"
        :style="{height:dottedBox.height+'px',width:dottedBox.width+'px',top:dottedBox.top+'px',left:dottedBox.left+'px'}"
      ></div>
      <!-- <div class="event-model" ref="event-model"></div> -->
    </div>
    <div class="box-attribute-panel"></div>
  </div>
</template>
<script>
import boxResizeNode from "../../components/box-resize-node";
export default {
  components: {
    boxResizeNode
  },
  data() {
    return {
      resizable: null,
      selectedBoxId: "",
      isMoving: false,
      //鼠标点击位置
      offset: null,
      selectedBox: null,
      activeNames: "1",
      sourceData: [
        {
          icon: "&#xe785;",
          label: "标题",
          type: "title"
        },
        {
          icon: "&#xe785;",
          label: "富文本",
          type: "richText"
        },
        {
          icon: "&#xe785;",
          label: "折线图",
          type: "line"
        },
        {
          icon: "&#xe785;",
          label: "视频"
        }
      ],
      viewData: [],
      boxs: {
        title: {
          width: "100%",
          height: "30px"
        },
        richText: {
          width: 300,
          height: 300
        },
        line: {
          width: 300,
          height: 300
        }
      },
      dottedBox: null,
      dragType: "",
      moving: true
    };
  },
  watch: {
    resizable: function(nval, oval) {
      if (nval) {
        this.$refs["edit-content"].onmousemove = this.boxResizeMove;
      } else {
        this.$refs["edit-content"].onmousemove = null;
      }
    }
  },
  methods: {
    clickAll() {
      console.log(1);
    },
    drag(type) {
      // this.$refs['event-model'].style.zIndex = 999
      this.dragType = type;
    },
    drop(ev) {
      // this.$refs['event-model'].style.zIndex = -1
      let data = {
        id: "chart" + new Date().getTime(),
        style: this.dottedBox
      };
      if (this.dragType == "line") {
        this.$nextTick().then(() => {
          let chart = this.$echarts.init(document.getElementById(data.id));
          let option = {
            xAxis: {
              type: "category",
              data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: "line"
              }
            ]
          };
          chart.setOption(option);
          data.chart = chart;
        });
      }
      this.viewData.push(data);
      this.dottedBox = null;
    },
    dragoverContent(ev) {
      // console.log("dragoverContent", ev, ev.clientX, ev.clientY);
      if (this.moving) {
        this.moving = false;
        // console.log(ev, (ev.offsetX - this.boxs[this.dragType].width / 2))
        let box = this.boxs[this.dragType];
        // console.log(box)
        // this.$set(this.dottedBox, 'top', ev.offsetY + 'px')
        let pushBox = {
          width: box.width,
          height: box.height,
          left: ev.clientX - 200 - box.width / 2,
          top: ev.clientY - box.height / 2
          // left: ev.offsetX - box.width / 2 + "px",
          // top: ev.offsetY - box.height / 2 + "px"
        };
        this.dottedBox = pushBox;
        // this.dottedBox.width = box.width + 'px'
        // this.dottedBox.height = box.height + 'px'
        // // this.dottedBox.top = ev.offsetY + 'px'
        // this.dottedBox.left = (ev.offsetX - box.width / 2) + 'px'
        // this.$set(this.dottedBox, 'top', (ev.offsetY - box.height / 2) + 'px')

        setTimeout(() => (this.moving = true), 30);
      }
    },
    dragover(ev) {
      if (this.moving) {
        this.moving = false;

        console.log(ev, ev.offsetX - this.boxs[this.dragType].width / 2);
        let box = this.boxs[this.dragType];
        console.log(box);
        // this.$set(this.dottedBox, 'top', ev.offsetY + 'px')
        let pushBox = {
          width: box.width,
          height: box.height,
          left: ev.offsetX - box.width / 2,
          top: ev.offsetY - box.height / 2
        };
        this.dottedBox = pushBox;
        // this.dottedBox.width = box.width + 'px'
        // this.dottedBox.height = box.height + 'px'
        // // this.dottedBox.top = ev.offsetY + 'px'
        // this.dottedBox.left = (ev.offsetX - box.width / 2) + 'px'
        // this.$set(this.dottedBox, 'top', (ev.offsetY - box.height / 2) + 'px')

        setTimeout(() => (this.moving = true), 30);
      }
    },
    viewBoxSelect(ev, item) {
      // this.selectedBoxId = item.id
      console.log("viewBoxSelect", item);
      this.selectedBox = item;
      this.viewBoxMoveDown(ev);
    },
    viewBoxMoveDown(e, item) {
      console.log("viewBoxMoveDown", e);
      // e.target.onmousemove = this.boxMove;
      this.selectedBox = item;
      this.$refs["edit-content"].onmousemove = this.boxMove;
      if (this.selectedBox) {
        let offset = {
          x: e.clientX,
          y: e.clientY,
          w: e.target.width,
          h: e.target.width
        };
        this.offset = offset;
        this.isMoving = true;
        // this.$refs['event-model'].style.zIndex = 999
      }
    },
    viewBoxMoveUp(e) {
      // console.log(e)
      // console.log("viewBoxMoveUp", e)
      // e.target.onmousemove = null;
      this.$refs["edit-content"].onmousemove = null;
      this.isMoving = false;
      if (this.selectedBox) this.selectedBox.chart.resize();
      // this.selectedBox = null;
      // this.$refs['event-model'].style.zIndex = 1
    },
    clearSelect() {
      this.selectedBox = null;
    },
    boxResizeMove(ev) {
      if (this.resizable) {
        // const { style } = this.selectedBox;
        // console.log("boxResizeMove", ev);
        // let moveX = ev.clientX - this.resizable.x;
        // let moveY = ev.clientY - this.resizable.y;
        // this.resizable.x = ev.clientX;
        // this.resizable.y = ev.clientY;
        // this.$set(this.selectedBox, "style", {
        //   width: style.width - moveX,
        //   height: style.height - moveY,
        //   left: style.left + moveX,
        //   top: style.top + moveY
        // });
        this.$set(this.selectedBox, "style", this.resizeChange(ev));
      }
    },
    resizeChange(ev) {
      // console.log(this.selectedBox);
      const { style } = this.selectedBox;
      let moveX = ev.clientX - this.resizable.x;
      let moveY = ev.clientY - this.resizable.y;
      this.resizable.x = ev.clientX;
      this.resizable.y = ev.clientY;
      // console.log(moveX, moveY);
      let reuslt = style;
      const { direction } = this.resizable;

      if (direction.indexOf("top") > -1) {
        reuslt.top = reuslt.top + moveY;
        reuslt.height = reuslt.height - moveY;
      }
      if (direction.indexOf("bottom") > -1) {
        reuslt.height = reuslt.height + moveY;
      }
      if (direction.indexOf("left") > -1) {
        reuslt.left = reuslt.left + moveX;
        reuslt.width = reuslt.width - moveX;
      }
      if (direction.indexOf("right") > -1) {
        reuslt.width = reuslt.width + moveX;
      }
      return reuslt;
    },
    boxMove(ev) {
      if (this.isMoving) {
        const { offset } = this;
        const { style } = this.selectedBox;
        // console.log("move", ev, this.$refs["edit-content"].offsetWidth)
        let moveX = ev.clientX - this.offset.x;
        let moveY = ev.clientY - this.offset.y;
        this.offset.x = ev.clientX;
        this.offset.y = ev.clientY;
        this.$set(this.selectedBox, "style", {
          width: style.width,
          height: style.height,
          left: this.checkRange(
            style.left + moveX,
            style.width,
            0,
            this.$refs["edit-content"].offsetWidth
          ),
          top: this.checkRange(
            style.top + moveY,
            style.height,
            0,
            this.$refs["edit-content"].offsetHeight
          )
        });
      }
    },
    //判断移动物体师傅超出边界
    checkRange(val, add, min, max) {
      console.log(val, add, min, max);
      if (val < min) return 1;
      if (val + add + 3 > max) return max - add - 3;
      return val;
    }
  }
};
/*
 ****** 元素视图属性
 * offsetWidth 水平方向 width + 左右padding + 左右border-width
 * offsetHeight 垂直方向 height + 上下padding + 上下border-width
 *
 * clientWidth 水平方向 width + 左右padding
 * clientHeight 垂直方向 height + 上下padding
 *
 * offsetTop 获取当前元素到 定位父节点 的top方向的距离
 * offsetLeft 获取当前元素到 定位父节点 的left方向的距离
 *
 * scrollWidth 元素内容真实的宽度，内容不超出盒子高度时为盒子的clientWidth
 * scrollHeight 元素内容真实的高度，内容不超出盒子高度时为盒子的clientHeight
 *
 ****** 元素视图属性结束
 *
 ****** Window视图属性（低版本IE浏览器[<IE9]不支持） 【自测包含滚动条，但网络教程都说不包含？？？】
 * innerWidth 浏览器窗口可视区宽度（不包括浏览器控制台、菜单栏、工具栏）
 * innerHeight 浏览器窗口可视区高度（不包括浏览器控制台、菜单栏、工具栏）
 * ***** Window视图属性结束
 *
 ****** Document文档视图
 * （低版本IE的innerWidth、innerHeight的代替方案）
 * document.documentElement.clientWidth 浏览器窗口可视区宽度（不包括浏览器控制台、菜单栏、工具栏、滚动条）
 * document.documentElement.clientHeight 浏览器窗口可视区高度（不包括浏览器控制台、菜单栏、工具栏、滚动条）
 *
 * document.documentElement.offsetHeight 获取整个文档的高度（包含body的margin）
 * document.body.offsetHeight 获取整个文档的高度（不包含body的margin）
 *
 * document.documentElement.scrollTop 返回文档的滚动top方向的距离（当窗口发生滚动时值改变）
 * document.documentElement.scrollLeft 返回文档的滚动left方向的距离（当窗口发生滚动时值改变）
 ****** Document文档视图结束
 *
 ****** 元素方法
 * 1. getBoundingClientRect() 获取元素到body
 *  bottom: 元素底边（包括border）到可视区最顶部的距离
 *  left: 元素最左边（不包括border）到可视区最左边的距离
 *  right: 元素最右边（包括border）到可视区最左边的距离
 *  top: 元素顶边（不包括border）到可视区最顶部的距离
 *  height: 元素的offsetHeight
 *  width: 元素的offsetWidth
 *  x: 元素左上角的x坐标
 *  y: 元素左上角的y坐标
 *
 * 2. scrollIntoView() 让元素滚动到可视区
 *
 * ***** 元素方法结束
 *
 */
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
  z-index: 999;
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
.box-attribute-panel {
  position: absolute;
  z-index: 999;
  width: 200px;
  height: 100%;
  right: 0px;
  background-color: #526ca7;
}
.iconfont {
  font-size: $icon-size;
  + div {
    width: $icon-size;
    text-align: center;
  }
}
.view-box {
  // background-color: aqua;
  position: absolute;
  // z-index: 10;
  -webkit-user-select: none;
  &.selected {
    // border: 1px solid #000;
  }
  .draggable {
    position: absolute;
    height: 100%;
    width: 100%;
    // z-index: 99;
    top: 0;
    left: 0;
  }
}

.dotted-box {
  position: absolute;
  border: 1px dotted #6e6e6e;
  z-index: 99;
}
.event-model {
  position: absolute;
  width: 100%;
  height: 100%;
  // background-color: chartreuse;
  z-index: -1;
}
</style>

