<template>
  <div class="wrapper">
    <PageHeader class="header">Восстановление пароля</PageHeader>

    <div class="title">Восстановление пароля по E-Mail</div>
    <form action="" class="form">
      <AuthInput
          v-for="(el, index) in inputs"
          :key="index"
          :name="el.vmod"
          v-model:value="el.value"
          v-model:error="el.error"

          ref="authInput"
          :inputInfo="el"
      ></AuthInput>
      <GrayBtn v-if="actionSend">Получить код</GrayBtn>
      <BlueBtn v-else @click="enterClick">Получить код</BlueBtn>

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
import {mapState} from "vuex";

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
        {f_icon: require('@/assets/icon/form/mail.svg'), title: 'E-mail', l_icon: '', vmod: 'mail', error: ''},
      ],
      actionSend: false,
    }
  },
  methods: {
    sendBtn(){
      this.actionSend = true
    },

    async enterClick() {

      this.errors = []

      this.$refs.authInput.forEach((el, index) =>{

        console.log('el', el.inputInfo)

        if(el.inputInfo.error) this.errors.push(el.inputInfo.error)
        if(!el.inputInfo.value) {
          // вбиваем ошибки незаполненых полей
          this.inputs[index].error = 'Введите ' + el.inputInfo.title
          this.errors.push(this.inputs[index].error)
        } else {
          // вбиваем данные авторизации если не пришли ошибки
          if(!el.inputInfo.error){
            this.inputs[index].error = ''
            this.recoverMailData[el.inputInfo.vmod] = el.inputInfo.value
          }
        }
      })

      console.log('this.errors', this.errors)
      console.log('this.recoverMailData', this.recoverMailData)


      this.errors.push('csfasfa')
      if (this.errors.length === 0) {
        // запрос авторизации
        this.loginData['type'] = 'recoverMail'

        await this.authRequest()

      }

    },

    formSubmit(e) {
      e.preventDefault()
    },
  },
  computed: {
    ...mapState({
      recoverMailData: state => state.recover.recoverMailData,
    })
  },
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

  .title{
    margin-top: 16px;
    margin-bottom: 25px;
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