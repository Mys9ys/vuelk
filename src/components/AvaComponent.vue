<template>
  <div class="ava_wrapper">
    <div class="background">
      <img class="icon" src="@/assets/icon/auth/profile.svg">
    </div>
    <div class="plus">+</div>
  </div>
</template>

<script>
export default {
  name: "AvaComponent"
}
</script>

<style lang="less" scoped>
.ava_wrapper {
  position: relative;
  display: inline-block;
  margin: 0 auto;
  margin-top: 24px;

  .background {
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    /* Согласие, кнопка прозр */
    background: #B4E3E6;
    border-radius: 100px;
  }

  .plus {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    font-size: 20px;
    bottom: 0;
    right: 0;
    width: 24px;
    height: 24px;
    background: #43BAC0;
    /* Белый */

    border: 3px solid #FFFFFF;
    border-radius: 100px;

    color: #FFFFFF;
  }
}
</style>