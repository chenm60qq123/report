<template>
  <div class="resizable">
    <div class="resize-node-common" :style="item" v-for="(item,index) in nodeData" :key="index">
      <div
        class="resize-node-inner-k_HYF"
        @mousedown.prevent="mousedown($event,item.direction)"
        @mouseup.prevent="mouseup"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "box-resize-node",
  props: {
    resizable: Object
  },
  data() {
    return {
      nodeData: [
        {
          top: "0px",
          left: "-3px",
          bottom: "0px",
          cursor: "w-resize",
          direction: "left"
        },
        {
          left: "0px",
          right: "0px",
          top: "-3px",
          cursor: "s-resize",
          direction: "top"
        },
        {
          left: "0px",
          right: "0px",
          bottom: "4px",
          cursor: "s-resize",
          direction: "bottom"
        },
        {
          top: "0px",
          bottom: "0px",
          right: "-1px",
          cursor: "w-resize",
          direction: "right"
        },
        {
          top: "-3px",
          right: "-1px",
          cursor: "ne-resize",
          direction: "top-right"
        },
        {
          top: "-3px",
          left: "-3px",
          cursor: "nw-resize",
          direction: "top-left"
        },
        {
          bottom: "4px",
          left: "-3px",
          cursor: "sw-resize",
          direction: "bottom-left"
        },
        {
          bottom: "4px",
          right: "-1px",
          cursor: "se-resize",
          direction: "bottom-right"
        }
      ],
      offset: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    mousedown(ev, direction) {
      this.offset = {
        x: ev.clientX,
        y: ev.clientY,
        direction: direction
      };
      this.$emit("update:resizable", this.offset);
    },
    mouseup() {
      this.$emit("update:resizable", null);
    }
    // mousemove(ev) {
    //   this.offset = {
    //     x: ev.clientX,
    //     y: ev.clientY
    //   };
    //   this.$emit("boxResize", this.offset);
    // }
  }
};
</script>

<style lang="scss" scoped>
.resizable {
  .resize-node-common {
    position: absolute;
    height: 0;
    width: 5px;
    margin: auto;
    z-index: 100;
    &::before {
      content: "";
      position: absolute;
      background: #fff;
      border: 1px solid #7d7d7d;
      -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
      height: 5px;
      width: 5px;
    }
  }
}
.resize-node-inner-k_HYF {
  position: absolute;
  opacity: 1;
  top: -6px;
  left: -6px;
  height: 17px;
  width: 17px;
}
</style>