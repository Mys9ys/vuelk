<template>
  <div class="btn">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BlueBtn"
}
</script>

<style lang="less" scoped>

  .btn{
    display: inline-block;
    width: 100%;
    padding: 17px 0;
    cursor: not-allowed;

    /* Корп цвет */
    background: #E7E7E7;
    border-radius: 20px;

    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    /* or 138% */

    letter-spacing: -0.408px;

    /* Белый */

    color: #8A8A8E;

}

</style>