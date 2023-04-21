<template>
    <div class="btn">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: "TransparentBtn"
}
</script>

<style scoped>
.btn{
  width: 100%;
  padding: 15px 0;
  cursor: pointer;

  /* Белый */

  background: #FFFFFF;
  /* Корп цвет */

  border: 2px solid #43BAC0;
  border-radius: 20px;

  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  /* or 138% *

  /* Черный */

  color: #000000;
}
</style>