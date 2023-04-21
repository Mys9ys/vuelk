<template>
  <div>
    <div class="header_block">
      <div class="block_title">
        <slot></slot>
      </div>
      <div class="btn_prev" @click="$router.go(-1)">Отмена</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader"
}
</script>

<style lang="less" scoped>
  .header_block{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .block_title{
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      /* identical to box height, or 138% */

      /* Черный */
      color: #000000;
    }
    .btn_prev{
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      /* identical to box height, or 157% */

      text-align: right;

      /* Серый */

      color: #8A8A8E;
    }
  }
</style>