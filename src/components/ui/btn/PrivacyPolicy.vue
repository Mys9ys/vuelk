<template>
  <div class="policy">
    <slot></slot>, вы принимаете <span>Условия участия</span>
    <br>и <span>Политику конфиденциальности</span>
  </div>
</template>

<script>
export default {
  name: "PrivacyPolicy"
}
</script>

<style lang="less" scoped>
  .policy{
    width: 100%;
    height: 44px;

    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    /* or 157% */

    text-align: center;
    /* Серый */
    color: #8A8A8E;
    span{
      display: inline;
      color: #43BAC0;
      text-decoration: underline;
    }

  }
</style>