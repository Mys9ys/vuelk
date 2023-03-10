<template>
  <div class="wrapper">
    <PageHeader class="header">Авторизация</PageHeader>


    <div class="logo">
      <img class="logo_img" :src="$store.state.logo" alt="">
    </div>

    <form action="" class="form">
      <AuthInput
          v-for="(el, index) in inputs"
          :key="index"
          :inputInfo="el"
      ></AuthInput>

      <BlueBtn @click="enterClick" :arrow="true">Войти</BlueBtn>
    </form>

    <div class="btn_link_box">
      <div class="btn_link" @click="$router.push('/recover')">Забыли свой пароль?</div>
      <div class="btn_link" @click="$router.push('/register')">Регистрация</div>
    </div>


    <PrivacyPolicy class="privacy">Входя в аккаунт</PrivacyPolicy>
  </div>
</template>

<script>
import PageHeader from "@/components/ui/PageHeader";
import PrivacyPolicy from "@/components/ui/btn/PrivacyPolicy";
import AuthInput from "@/components/ui/input/AuthInput";
import BlueBtn from "@/components/ui/btn/BlueBtn";

export default {
  name: "AuthPage",
  components: {
    PageHeader,
    PrivacyPolicy,
    AuthInput,
    BlueBtn
  },
  data() {
    return {
      inputs: [
        {f_icon: require('@/assets/icon/form/mail.svg'), title: 'E-mail', l_icon: ''},
        {
          f_icon: require('@/assets/icon/form/pass.svg'),
          title: 'Пароль',
          l_icon: require('@/assets/icon/form/eye.svg')
        },
      ]
    }
  },

  methods: {
    enterClick(){
      this.$store.dispatch('authSuccess');
      this.$router.push('/')
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
  padding-top: 35px;

  .logo {
    margin-top: 149px;
  }

  .form{
    display: flex;
    margin-top: 52px;
    flex-direction: column;
    gap: 32px;
  }

  .btn_link_box{
    margin-top: 13px;
    .btn_link{
      margin-bottom: 8px;
      text-decoration: underline;
      color: #43BAC0;
    }
  }


  .privacy {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    bottom: 45px;
  }
}
</style>