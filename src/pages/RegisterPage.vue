<template>
    <div class="wrapper">
      <PageHeader class="header">Регистрация</PageHeader>
      <div class="ava_wrapper">
        <div class="background">
          <img class="icon" src="@/assets/icon/auth/profile.svg">
        </div>
        <div class="plus">+</div>
      </div>
      <form action="" class="form">
        <AuthInput
            v-for="(el, index) in inputs"
            :key="index"
            :inputInfo ="el"
        ></AuthInput>

        <BlueBtn class="btn" @click="$router.push('/auth_success')">Зарегистрироваться</BlueBtn>
      </form>

      <PrivacyPolicy class="policy">Регистрируясь</PrivacyPolicy>
    </div>
</template>

<script>
import PageHeader from "@/components/ui/PageHeader";
import AuthInput from "@/components/ui/input/AuthInput";
import BlueBtn from "@/components/ui/btn/BlueBtn";
import PrivacyPolicy from "@/components/ui/btn/PrivacyPolicy";

export default {
  name: "RegisterPage",
  components: {
    PageHeader,
    AuthInput,
    BlueBtn,
    PrivacyPolicy
  },

  data(){
    return {
      inputs: [
        { f_icon: require('@/assets/icon/register/fio.svg'), title: 'Ф.И.О.', l_icon: ''},
        { f_icon: require('@/assets/icon/register/phone.svg'), title: 'Мобильный телефон', l_icon: ''},
        { f_icon: require('@/assets/icon/register/mail.svg'), title: 'E-mail', l_icon: ''},
        { f_icon: require('@/assets/icon/register/pass.svg'), title: 'Пароль', l_icon: require('@/assets/icon/register/eye.svg')},
        { f_icon: require('@/assets/icon/register/pass.svg'), title: 'Повторите пароль', l_icon: require('@/assets/icon/register/eye.svg')},
      ]
    }
  },
}
</script>

<style lang="less" scoped>
  .wrapper{
    position: relative;
    background: #FFFFFF;
    width: 100vw;
    margin: 0 auto;
    height: 100vh;
    text-align: center;
    padding: 0 24px;

    .header{
      margin-top: 35px;
    }

    .ava_wrapper{
      position: relative;
      display: inline-block;
      margin: 0 auto;
      margin-top: 24px;

      .background{
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
      .plus{
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
    .form{
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 24px;

      .btn{
        margin-top: 69px;
      }
    }
    .policy{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      bottom: 45px;
    }
  }
</style>