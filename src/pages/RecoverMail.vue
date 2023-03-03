<template>
  <div class="wrapper">
    <PageHeader class="header">Восстановление пароля</PageHeader>

    <div class="title">Восстановление пароля по Логину/E-Mail</div>
    <form action="" class="form">
      <AuthInput
          v-for="(el, index) in inputs"
          :key="index"
          :inputInfo ="el"
      ></AuthInput>
      <GrayBtn v-if="actionSend" @click="sendBtn">Получить код</GrayBtn>
      <BlueBtn v-else @click="sendBtn">Получить код</BlueBtn>

    </form>
    <div class="recover_wrapper" v-if="actionSend">
      <div class="recover_mes">
        Проверочный код отправлен
      </div>

      <FormCode></FormCode>
    </div>



  </div>
</template>

<script>
import PageHeader from "@/components/ui/PageHeader";
import AuthInput from "@/components/ui/input/AuthInput";
import BlueBtn from "@/components/ui/btn/BlueBtn";
import FormCode from "@/components/ui/form/FormCode";
import GrayBtn from "@/components/ui/btn/GrayBtn";

export default {
  name: "RecoverMail",
  components: {
    BlueBtn,
    PageHeader,
    AuthInput,
    FormCode,
    GrayBtn
  },
  data() {
    return {
      inputs: [
        {f_icon: require('@/assets/icon/form/mail.svg'), title: 'Логин или E-Mail', l_icon: ''},
      ],
      actionSend: false,
    }
  },
  methods: {
    sendBtn(){
      this.actionSend = true
    }
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

  .title{
    margin-top: 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;

    text-align: left;
    /* identical to box height, or 157% */

    letter-spacing: -0.408px;

    /* Черный */

    color: #000000;
  }

  .form {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .recover_mes{
    margin-top: 4px;
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    /* identical to box height, or 183% */

    text-align: center;
    letter-spacing: -0.41px;

    /* Корп цвет */

    color: #43BAC0;
  }


}
</style>