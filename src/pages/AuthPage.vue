<template>
  <div class="wrapper">
    <PageHeader class="header">Авторизация</PageHeader>

    <div class="logo">
      <img class="logo_img" :src="$store.state.logo" alt="">
    </div>

    <form action="" @click="formSubmit" class="form">
      <div class="input_wrapper"
           v-for="(el, index) in inputs"
           :key="index"
      >
        <AuthInput class="auth_gap"
            v-if="!el.login || activeLogin == el.login"
            :name="el.vmod"
            v-model:value="el.value"
            v-model:error="el.error"

            v-model:login="activeLogin"

            ref="authInput"
            :inputInfo="el"
        ></AuthInput>
      </div>


      <div class="btn_send_block">
        <div v-if="loginError" class="error_mes">{{ loginError }}</div>
        <BlueBtn @click="enterClick" :arrow="true">Войти</BlueBtn>
      </div>

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
      errors: [],
      inputs: [
        {
          f_icon: require('@/assets/icon/form/mail.svg'),
          title: 'E-mail',
          l_icon: '',
          vmod: 'mail',
          value: '',
          error: null,
          login: 'mail'
        },
        {
          f_icon: require('@/assets/icon/form/phone.svg'),
          title: 'Телефон',
          l_icon: '',
          vmod: 'phone',
          value: '',
          error: null,
          login: 'phone'
        },
        {
          f_icon: require('@/assets/icon/form/pass.svg'),
          title: 'Пароль',
          l_icon: require('@/assets/icon/form/eye.svg'),
          vmod: 'pass',
          value: '',
          error: null,
        },
      ],
      error: null,
      allowFlag: [],
      activeLogin: 'mail'
    }
  },

  methods: {
    ...mapMutations({
      setLoginData: 'auth/setLoginData',
    }),
    ...mapActions({
      authRequest: 'auth/authRequest',
    }),

    async enterClick() {

      this.errors = []

      this.$refs.authInput.forEach((el, index) => {

        if (el.inputInfo.error) this.errors.push(el.inputInfo.error)
        if (!el.inputInfo.value) {
          // вбиваем ошибки незаполненых полей
          this.inputs[index].error = 'Введите ' + el.inputInfo.title
          this.errors.push(this.inputs[index].error)
        } else {
          // вбиваем данные авторизации если не пришли ошибки
          if (!el.inputInfo.error) {
            this.inputs[index].error = ''
            this.loginData[el.inputInfo.vmod] = el.inputInfo.value
          }
        }
      })

      if (this.errors.length === 0) {

        // запрос авторизации по разным тпам логирования
        if(this.loginData['mail'] && this.activeLogin === 'mail') this.loginData['type'] = 'loginMail'
        if(this.loginData['phone'] && this.activeLogin === 'phone') this.loginData['type'] = 'loginPhone'

        await this.authRequest()

        if (!this.loginError) this.$router.push('/main')
      }
    },

    formSubmit(e) {
      e.preventDefault()
    },
  },

  computed: {
    ...mapState({
      loginData: state => state.auth.loginData,
      loginError: state => state.auth.loginError,
    })
  },
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";

.wrapper {
  .wrapper_template;

  .logo {
    margin-top: 149px;
  }

  .form {
    display: flex;
    margin-top: 52px;
    flex-direction: column;
    .input_wrapper{
      display: flex;
      flex-direction: column;
      .auth_gap{
        margin-bottom: 32px;
      }
    }
  }

  .btn_send_block {
    position: relative;

    .error_mes {
      position: absolute;
      left: 10px;
      top: -22px;
      color: #FF6262;
    }

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
      cursor: pointer;
    }
  }

  .disable {
    background: #8A8A8E;
    cursor: not-allowed;
  }

  .privacy {
    text-align: center;
    margin-top: 30%;
  }
}
</style>