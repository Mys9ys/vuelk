<template>
  <div class="btn">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BlueBlurBtn"
}
</script>

<style lang="less" scoped>
.btn {
  display: inline-block;

  padding: 8px 27px;
  background: #B4E3E6;
  border-radius: 20px;

  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  /* identical to box height, or 157% */

  /* Корп цвет */
  color: #43BAC0;
}
</style>