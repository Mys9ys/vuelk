<template>
  <div class="btn" :class="{'arrow' : arrow}">
    <span><slot></slot></span>
    <img v-if="arrow" src="@/assets/icon/btn/arrow.svg">
  </div>
</template>

<script>
export default {
  name: "BlueBtn",
  props: {
    arrow: {
      type: Boolean
    }
  }

}
</script>

<style lang="less" scoped>

  .btn{
    display: flex;
    flex-direction: row;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    padding: 17px 18px;
    cursor: pointer;

    /* Корп цвет */
    background: #43BAC0;
    border-radius: 20px;

    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    /* or 138% */

    letter-spacing: -0.408px;

    /* Белый */

    color: #FFFFFF;

    &.arrow{
      justify-content: space-between;
    }

}

</style>