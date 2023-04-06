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

            ref="regInput"
            :inputInfo ="el"
        ></AuthInput>
      </form>

      <div class="footer">
        <div class="btn_block">
          <div v-if="registerError" class="error_mes">{{ registerError }}</div>
          <!--        <BlueBtn class="disable" :arrow="true">Войти</BlueBtn>-->
          <BlueBtn
              class="btn"
              :arrow = "true"
              @click="enterClick"
          >Зарегистрироваться</BlueBtn>
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

  data(){
    return {
      // inputs: [
      //   { f_icon: require('@/assets/icon/form/fio.svg'), title: 'Ф.И.О.', l_icon: '', vmod: 'fio', value: ''},
      //   { f_icon: require('@/assets/icon/form/phone.svg'), title: 'Мобильный телефон', l_icon: '', vmod: 'phone', value: '' },
      //   { f_icon: require('@/assets/icon/form/mail.svg'), title: 'E-mail', l_icon: '', vmod: 'mail', value: ''},
      //   { f_icon: require('@/assets/icon/form/pass.svg'), title: 'Пароль', l_icon: require('@/assets/icon/form/eye.svg'), vmod: 'pass', value: ''},
      //   { f_icon: require('@/assets/icon/form/pass.svg'), title: 'Повторите пароль', l_icon: require('@/assets/icon/form/eye.svg'), vmod: 'pass2', value: ''},
      // ],
      inputs: [
        { f_icon: require('@/assets/icon/form/fio.svg'), title: 'Ф.И.О.', l_icon: '', vmod: 'fio', value: 'Иванов Иван'},
        { f_icon: require('@/assets/icon/form/phone.svg'), title: 'Мобильный телефон', l_icon: '', vmod: 'phone', value: '+7(978) 979-8987'},
        { f_icon: require('@/assets/icon/form/mail.svg'), title: 'E-mail', l_icon: '', vmod: 'mail', value: 'test2test@test.ru'},
        { f_icon: require('@/assets/icon/form/pass.svg'), title: 'Пароль', l_icon: require('@/assets/icon/form/eye.svg'), vmod: 'pass', value: '123456'},
        { f_icon: require('@/assets/icon/form/pass.svg'), title: 'Повторите пароль', l_icon: require('@/assets/icon/form/eye.svg'), vmod: 'pass2', value: '123456'},
      ]
    }
  },
  methods: {
    ...mapActions({
      registrationRequest: 'reg/registrationRequest',
    }),

    async enterClick() {

      let errors = []

      this.$refs.regInput.forEach((el, index) =>{

        if(!el.inputInfo.value) {
          // вбиваем ошибки незаполненых полей
          this.inputs[index].error = 'Введите ' + el.inputInfo.title
          errors.push(this.inputs[index].error)
        } else {
          // вбиваем данные регистрации
          this.inputs[index].error = ''
          this.regData[el.inputInfo.vmod] = el.inputInfo.value
        }
      })

      console.log('fdfhdf',this.regData )
      console.log('error',errors )

      if (errors.length === 0) {
        // запрос авторизации

        await this.registrationRequest()

        if (!this.registerError) this.$router.push('/register_success')
      }

    },
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
    .footer{
      width: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      bottom: 45px;
      padding: 0 24px;
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