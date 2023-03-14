<template>
  <div class="wrapper">
    <PageHeader class="header">Авторизация</PageHeader>


    <div class="logo">
      <img class="logo_img" :src="$store.state.logo" alt="">
    </div>

    <form action="" @click="formSubmit" class="form">
      <AuthInput
          v-for="(el, index) in inputs"
          :key="index"
          :name="el.vmod"
          v-model:value="el.value"
          v-model:error="el.error"

          :inputInfo="el"
      ></AuthInput>

      <BlueBtn v-if="errors" class="disable" :arrow="true">Войти</BlueBtn>
      <BlueBtn v-else @click="enterClick" :arrow="true">Войти</BlueBtn>
    </form>

    <div class="btn_link_box">
      <div class="btn_link" @click="$router.push('/recover')">Забыли свой пароль?</div>
      <div class="btn_link" @click="$router.push('/register')">Регистрация</div>
    </div>

    <PrivacyPolicy class="privacy">Входя в аккаунт</PrivacyPolicy>
  </div>
</template>

<script>
import {mapMutations, mapActions, mapState} from 'vuex'
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
        {
          f_icon: require('@/assets/icon/form/mail.svg'),
          title: 'E-mail',
          l_icon: '',
          vmod: 'mail',
          value: '',
          error: null,
        },
        {
          f_icon: require('@/assets/icon/form/pass.svg'),
          title: 'Пароль',
          l_icon: require('@/assets/icon/form/eye.svg'),
          vmod: 'pass',
          value: '',
        },
      ],
      errors: false
    }
  },

  methods: {
    ...mapMutations({
      setAuthData: 'auth/setAuthData',
    }),
    ...mapActions({
      authRequest: 'auth/authRequest'
    }),
    enterClick() {


      this.inputs.forEach((el) => {
        console.log(el.value)
        console.log(el.error)
        console.log(el)
        this.authData[el.vmod] = el.value
      })

      // const data = {
      //   login: 'fds',
      //   pass: 'fdsfs'
      // }

      console.log(this.authData, 'this.authData')
      // this.setAuthData(data)

      this.authRequest()
      // this.$store.dispatch('authSuccess');
      // this.$router.push('/')
    },

    formSubmit(e) {
      e.preventDefault()
    },

  },

  computed: {
    ...mapState({
      authData: state => state.auth.authData,
    })
  },
  watch: {
    focusLeave(el) {
      if (el.error) {
        console.log('err tru')
        this.errors = true
      } else {
        console.log('err false')
        this.errors = false
      }
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

  .form {
    display: flex;
    margin-top: 52px;
    flex-direction: column;
    gap: 32px;
  }

  .btn_link_box {
    margin-top: 13px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;

    .btn_link {
      display: inline-block;
      margin-bottom: 8px;
      text-decoration: underline;
      color: #43BAC0;
    }
  }

  .disable {
    background: #8A8A8E;
    cursor: not-allowed;
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