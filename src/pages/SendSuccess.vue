<template>
  <div class="wrapper">
    <div class="info">Пациент успешно передан</div>
    <TransparentBtn @click="$router.go(-2)">Вернуться</TransparentBtn>
  </div>
</template>

<script>
import TransparentBtn from "@/components/ui/btn/TransparentBtn";

export default {
  name: "SendSuccess",
  components: {
    TransparentBtn
  }

}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
.wrapper {
  .wrapper_template;
  display: flex;
  flex-direction: column;
  align-items: center;

  .info{
    width: 100%;
    margin-top: 322px;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    margin-bottom: 19px;
    /* or 157% */



    /* Черный */

    color: #000000;
  }
}
</style>