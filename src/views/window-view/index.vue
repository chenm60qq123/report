<template>
  <div class="win-view-contain">
    <div class="win-view-report" @drop="drop" @dragover.prevent></div>
    <div class="win-view-panel">
      <div draggable="true" @dragstart="drag($event)" @click="click" id="elele" style="100%">12313</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      offsetX: 0,
      offsetY: 0,
      width: 0
    };
  },
  methods: {
    click(ev) {
      console.log(ev);
      console.log(ev.target.style.width);
    },
    drag(ev) {
      console.log(ev);
      ev.dataTransfer.setData("Text", ev.target.id);
      this.offsetX = ev.offsetX;
      this.offsetY = ev.offsetY;
      console.log(
        ev.target.style.width ||
          ev.target.clientWidth ||
          ev.target.offsetWidth ||
          ev.target.scrollWidth
      );
      this.width =
        ev.target.style.width ||
        ev.target.clientWidth ||
        ev.target.offsetWidth ||
        ev.target.scrollWidth;
    },
    drop(ev) {
      console.log(ev);
      ev.preventDefault();
      var data = ev.dataTransfer.getData("Text");
      let doc = document.getElementById(data);
      doc.style.position = "absolute";
      doc.style.left = ev.offsetX - this.offsetX + "px";
      doc.style.top = ev.offsetY - this.offsetY + "px";
      doc.style.width = this.width + "px";
      ev.target.appendChild(doc);
    },
    allowDrop(ev) {
      console.log(ev);
      ev.preventDefault();
    }
  }
};
</script>

<style  scoped>
.win-view-contain {
  display: flex;
  height: 1000px;
}
.win-view-report {
  position: relative;
  width: 80%;
  height: 1000px;
  /* background-color: rgb(220, 255, 22); */
  background-image: linear-gradient(transparent 90%, rgb(230, 228, 228) 90%),
    linear-gradient(to right, transparent 90%, rgb(230, 228, 228) 90%);
  background-size: 10px 10px;
}
.win-view-panel {
  width: 20%;
  height: 1000px;
}
</style>