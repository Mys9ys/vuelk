<template>
  <div class="pagination">
    <div class="left arrow"><img src="@/assets/icon/pagination/left.svg" alt=""></div>
    <div v-for="index in 4" :key="index">
      <div class="btn_page active" v-if="active===index" ><span>{{index}}</span></div>
      <div class="btn_page" v-else ><span>{{index}}</span></div>
    </div>

    <span class="btn_page">...</span>
    <div class="btn_page"><span>{{btns}}</span></div>
    <div class="right"><img src="@/assets/icon/pagination/right.svg" alt=""></div>
  </div>
</template>

<script>
export default {
  name: "PaginationBlock",
  data() {
    return {
      btns: 14,
      active: 1
    }
  },
  methods: {
    paginationClick(){

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
  padding: 24px 20px;
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