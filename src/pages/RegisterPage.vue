<template>
  <div class="wrapper">

    <PageHeader class="header">Регистрация</PageHeader>
    <AvaComponent
        :pageType="'reg'"
        :img="$store.state.reg.avaLink"
    ></AvaComponent>
    <form action="" class="form">
      <AuthInput
          v-for="(el, index) in inputs"
          :key="index"
          :name="el.vmod"
          v-model:value="el.value"
          v-model:error="el.error"

          @focusout="regFocusOut(el)"

          @input="checkPass(el)"

          ref="regInput"
          :inputInfo="el"
      ></AuthInput>
    </form>

    <div class="footer">
      <div class="btn_block">
        <div v-if="registerError" class="error_mes">{{ registerError }}</div>
        <!--        <BlueBtn class="disable" :arrow="true">Войти</BlueBtn>-->
        <BlueBtn
            class="btn"
            :arrow="true"
            @click="enterClick"
        >Зарегистрироваться
        </BlueBtn>
      </div>

      <PrivacyPolicy class="policy">Регистрируясь</PrivacyPolicy>
    </div>

  </div>
</template>

<script>
import PageHeader from "@/components/ui/PageHeader";
import AuthInput from "@/components/ui/input/AuthInput";
import BlueBtn from "@/components/ui/btn/BlueBtn";
import PrivacyPolicy from "@/components/ui/btn/PrivacyPolicy";
import AvaComponent from "@/components/AvaComponent";
import {mapActions, mapState} from "vuex";


export default {
  name: "RegisterPage",
  components: {
    PageHeader,
    AuthInput,
    BlueBtn,
    PrivacyPolicy,
    AvaComponent
  },

  data() {
    return {
      errors: [],
      inputs: [
        { f_icon: require('@/assets/icon/form/fio.svg'), title: 'Ф.И.О.', l_icon: '', vmod: 'fio', value: ''},
        { f_icon: require('@/assets/icon/form/phone.svg'), title: 'Мобильный телефон', l_icon: '', vmod: 'phone', value: '' },
        { f_icon: require('@/assets/icon/form/mail.svg'), title: 'E-mail', l_icon: '', vmod: 'mail', value: ''},
        { f_icon: require('@/assets/icon/form/pass.svg'), title: 'Пароль', l_icon: require('@/assets/icon/form/eye.svg'), vmod: 'pass', value: ''},
        { f_icon: require('@/assets/icon/form/pass.svg'), title: 'Повторите пароль', l_icon: require('@/assets/icon/form/eye.svg'), vmod: 'pass2', value: ''},
      ],
    }
  },
  methods: {
    ...mapActions({
      registrationRequest: 'reg/registrationRequest',
    }),

    async enterClick() {

      this.errors = []

      this.passError()

      this.$refs.regInput.forEach((el, index) => {

        if (el.inputInfo.error) this.errors.push(el.inputInfo.error)
        if (!el.inputInfo.value) {
          // вбиваем ошибки незаполненых полей
          this.inputs[index].error = 'Введите ' + el.inputInfo.title
          this.errors.push(this.inputs[index].error)
        } else {
          // вбиваем данные регистрации
          if(!el.inputInfo.error){
            this.inputs[index].error = ''
            this.regData[el.inputInfo.vmod] = el.inputInfo.value
          }
        }
      })
      // this.errors.push('dzsd')


      if (this.errors.length === 0) {
        // запрос регистрации
        await this.registrationRequest()

        if (!this.registerError) this.$router.push('/register_success')
      }

    },

    regFocusOut(elem) {
      if (elem.vmod === 'pass' || elem.vmod === 'pass2') {
        this.passError()
      }
    },

    checkPass(){
      this.passError()
    },

    passError() {
      this.inputs[3].error = this.inputs[4].error = ''
      if (this.inputs[3].value !== this.inputs[4].value) {
        this.errors.push('Пароли не совпадают')
        this.inputs[3].error = this.inputs[4].error = 'Пароли не совпадают'
      }
    }

  },

  computed: {
    ...mapState({
      avaLink: state => state.reg.avaLink,
      regData: state => state.reg.regData,
      registerError: state => state.reg.registerError,
    })
  },
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
.wrapper {
  .wrapper_template;
  overflow-y:scroll;

  .form {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .btn {
      margin-top: 69px;
    }
  }

  .footer {
    margin-top: 24px;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .btn_block {
      position: relative;

      .error_mes {
        position: absolute;
        display: inline-block;
        left: 10px;
        bottom: 60px;
        color: #FF6262;
      }
    }
  }

}
</style>