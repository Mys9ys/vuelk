<template>
  <div class="wrapper">
    <PageHeader class="header">Передача пациента</PageHeader>
    <AvaComponent></AvaComponent>
    <form action="" class="form">
      <AuthInput
          v-for="(el, index) in inputs"
          :key="index"
          :name="el.vmod"
          v-model:value="el.value"
          v-model:error="el.error"

          ref="infoPatient"
          :inputInfo="el"
      ></AuthInput>

      <BlueBtn
          class="btn"
          :arrow = "true"
          @click="enterClick"
      >Передать </BlueBtn>
    </form>
  </div>
</template>

<script>
import PageHeader from "@/components/ui/PageHeader";
import AvaComponent from "@/components/AvaComponent";
import AuthInput from "@/components/ui/input/AuthInput";
import BlueBtn from "@/components/ui/btn/BlueBtn";
import {mapActions, mapState} from "vuex";

export default {
  name: "PatientSend",
  components:{
    PageHeader,
    AvaComponent,
    AuthInput,
    BlueBtn
  },
  data(){
    return {
      errors: [],
      inputs: [
        { f_icon: require('@/assets/icon/form/fio.svg'), title: 'Фамилия', l_icon: '', vmod: 'family'},
        { f_icon: require('@/assets/icon/form/fio.svg'), title: 'Имя', l_icon: '', vmod: 'name'},
        { f_icon: require('@/assets/icon/form/fio.svg'), title: 'Отчество', l_icon: '', vmod: 'fatherstvo'},
        { f_icon: require('@/assets/icon/form/phone.svg'), title: 'Мобильный телефон', l_icon: '', vmod: 'phone'},
      ],

      // inputs: [
      //   { f_icon: require('@/assets/icon/form/fio.svg'), title: 'Фамилия', l_icon: '', vmod: 'family', value: 'shsghsh'},
      //   { f_icon: require('@/assets/icon/form/fio.svg'), title: 'Имя', l_icon: '', vmod: 'name', value: 'fsddgfs'},
      //   { f_icon: require('@/assets/icon/form/fio.svg'), title: 'Отчество', l_icon: '', vmod: 'fatherstvo', value: 'as tgasgf'},
      //   { f_icon: require('@/assets/icon/form/phone.svg'), title: 'Мобильный телефон', l_icon: '', vmod: 'phone', value:'+7(969) 567-9556'},
      // ]
    }
  },
  methods: {
    ...mapActions({
      sendPatientRequest: 'patient/sendPatientRequest',
    }),

    async enterClick() {

      this.$refs.infoPatient.forEach((el, index) =>{

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
            this.patientData[el.inputInfo.vmod] = el.inputInfo.value
          }
        }
      })

      // this.errors.push('fsfds')

      if (this.errors.length === 0) {
        // запрос авторизации
        this.patientData['token'] = this.token

        await this.sendPatientRequest()

        if (!this.patientError) this.$router.push('/send_success')
      }

    },

    formSubmit(e) {
      e.preventDefault()
    },
  },

  computed: {
    ...mapState({
      patientData: state => state.patient.patientData,
      token: state => state.auth.authData.token,
    })
  },
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
.wrapper {
  .wrapper_template;
    overflow-y:scroll;
    .form{
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 24px;

      .btn{
        margin-top: 69px;
      }
    }
  }
</style>