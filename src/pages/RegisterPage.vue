<template>
    <div class="wrapper">
      <PageHeader class="header">Регистрация</PageHeader>
      <AvaComponent></AvaComponent>
      <form action="" class="form">
        <AuthInput
            v-for="(el, index) in inputs"
            :key="index"
            :name="el.vmod"
            v-model:value="el.value"
            :inputInfo ="el"
        ></AuthInput>

        <BlueBtn
            class="btn"
            :arrow = "true"
            @click="enterClick"
        >Зарегистрироваться</BlueBtn>
      </form>

      <PrivacyPolicy class="policy">Регистрируясь</PrivacyPolicy>
    </div>
</template>

<script>
import PageHeader from "@/components/ui/PageHeader";
import AuthInput from "@/components/ui/input/AuthInput";
import BlueBtn from "@/components/ui/btn/BlueBtn";
import PrivacyPolicy from "@/components/ui/btn/PrivacyPolicy";
import AvaComponent from "@/components/AvaComponent";

export default {
  name: "RegisterPage",
  components: {
    PageHeader,
    AuthInput,
    BlueBtn,
    PrivacyPolicy,
    AvaComponent
  },

  data(){
    return {
      inputs: [
        { f_icon: require('@/assets/icon/form/fio.svg'), title: 'Ф.И.О.', l_icon: '', vmod: 'fio', value: null},
        { f_icon: require('@/assets/icon/form/phone.svg'), title: 'Мобильный телефон', l_icon: '', vmod: 'phone', value: null },
        { f_icon: require('@/assets/icon/form/mail.svg'), title: 'E-mail', l_icon: '', vmod: 'mail', value: null},
        { f_icon: require('@/assets/icon/form/pass.svg'), title: 'Пароль', l_icon: require('@/assets/icon/form/eye.svg'), vmod: 'pass', value: null},
        { f_icon: require('@/assets/icon/form/pass.svg'), title: 'Повторите пароль', l_icon: require('@/assets/icon/form/eye.svg'), vmod: 'pass2', value: null},
      ]
    }
  },
  methods: {
    enterClick() {

      this.inputs.forEach((el)=>{
        console.log(el.value)
      })
      // this.$store.dispatch('authSuccess');
      // this.$router.push('/')
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
    padding-top: 35px;

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