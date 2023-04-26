<template>
  <div class="pagination">
    <div class="left arrow" @click="minusPage"><img src="@/assets/icon/pagination/left.svg" alt=""></div>
    <div class="btn_page" :class="{'active' : active===1}" @click="paginationClick(1)"><span>1</span></div>
    <span class="btn_page pagination_doted" v-if="active > 3">...</span>
    <div
        v-for="index in btns" :key="index"
        class="btn_page"
        :class="{'active' : active===index}"
        @click="paginationClick(index)"
    ><span>{{index}}</span></div>

    <span class="btn_page pagination_doted" v-if="active < btns_max-2">...</span>
    <div class="btn_page" :class="{'active' : active===btns_max}" @click="paginationClick(btns_max)"><span>{{btns_max}}</span></div>
    <div class="right" @click="plusPage"><img src="@/assets/icon/pagination/right.svg" alt=""></div>
  </div>
</template>

<script>
export default {
  name: "PaginationBlock",
  props: {
    max:{
      type: String
    }
  },
  data() {
    return {
      btns_max: this.max ?? '',
      active: 1,
      btns: []
    }
  },
  mounted() {
    if(this.btns_max ===3){
      this.btns = [2]
    }
    if(this.btns_max ===4){
      this.btns = [2,3]
    }
    if(this.btns_max >4){
      this.btns = [2,3,4]
    }
  },
  methods: {
    paginationClick(value){
      if(value>2 && value< this.btns_max-2){
        if(this.btns_max > 4) {
          this.btns = [value - 1, value, value + 1]
        }
      }
      if(value>1 && value<2){
        if(this.btns_max > 4){
          this.btns = [value,value+1,value+2]
        }
      }
      if(value>this.btns_max-3 && value<this.btns_max-1){
        if(this.btns_max > 4){
          this.btns = [value-1,value,value+1]
        }
      }
      if(value === 1) {
        if(this.btns_max > 4) {
          this.btns = Array.from({length: 3}, (_, i) => i + value + 1)
        }
      }
      if(value === this.btns_max) {
        if(this.btns_max > 4) {
          this.btns = Array.from({length: 3}, (_, i) => i + value - 3)
        }
      }
      this.active = value
      this.$emit('updatePagination', {
        pagination:this.active
      })
    },
    minusPage(){
      if(this.active>1){
        this.active -=1
        this.paginationClick(this.active)
      }

    },
    plusPage(){
      if(this.active<this.btns_max) {
        this.active += 1
        this.paginationClick(this.active)
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
  gap:16px;
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

    &.pagination_doted{
      width: 14px;
    }
  }
}
</style>