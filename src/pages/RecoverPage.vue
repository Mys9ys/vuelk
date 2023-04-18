<template>
  <div class="wrapper">
    <PageHeader class="header">Восстановление пароля</PageHeader>

    <div class="btn_link_box">
      <BlueBtn @click="$router.push('/recover_mail')">Восстановить по E-mail</BlueBtn>
      <TransparentBtn @click="$router.push('/recover_sms')">Восстановить по номеру телефона</TransparentBtn>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/ui/PageHeader";
import BlueBtn from "@/components/ui/btn/BlueBtn";
import TransparentBtn from "@/components/ui/btn/TransparentBtn";

export default {
  name: "RecoverPage",
  components: {
    PageHeader,
    BlueBtn,
    TransparentBtn
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  position: relative;
  background: #FFFFFF;
  width: 100vw;
  margin: 0 auto;
  height: 100vh;
  text-align: center;
  padding: 0 24px;
  padding-top: 35px;
  box-sizing: border-box;

  .btn_link_box {
    position: relative;
    top:50%;
    width: 100%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 12px;

  }
}
</style>