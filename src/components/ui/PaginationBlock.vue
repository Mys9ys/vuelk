<template>
  <div class="pagination">
    <div class="left arrow" @click="minusPage"><img src="@/assets/icon/pagination/left.svg" alt=""></div>

    <div
        v-for="index in btns" :key="index"
        class="btn_page"
        :class="{'active' : active===index}"
        @click="paginationClick(index)"
    ><span>{{index}}</span></div>

    <span class="btn_page">...</span>
    <div class="btn_page"><span>{{btns_max}}</span></div>
    <div class="right" @click="plusPage"><img src="@/assets/icon/pagination/right.svg" alt=""></div>
  </div>
</template>

<script>
export default {
  name: "PaginationBlock",
  data() {
    return {
      btns_max: 14,
      active: 1,
      btns: [1,2,3,4]
      // btns: [1,2,3,4, '...', btns_max]
    }
  },
  methods: {
    paginationClick(value){
      if(this.btns[0]<this.btns_max-4){
        this.btns = Array.from({ length: 4 }, (_, i) => i+value)
      }
      this.active = value
    },
    minusPage(){
      if(this.btns[0]>1) {
        this.btns = this.btns.map(i=>i-1)
        this.active -= 1
      }
    },
    plusPage(){
      if(this.btns[0]<this.btns_max) {
        this.btns = this.btns.map(i=>i+1)
        this.active += 1
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  gap:20px;
  .arrow{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .btn_page{
    width: 24px;
    height: 24px;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    /* identical to box height, or 138% */

    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    justify-content: center;
    /* Серый */

    color: #8A8A8E;

    &.active{
      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
      border-radius: 50%;
      /* or 138% */

      letter-spacing: -0.408px;

      /* Выделенный корп цвет */

      background: #B4E3E6;
      span{
        color: #535355;
        mix-blend-mode: difference;
      }
    }
  }
}
</style>