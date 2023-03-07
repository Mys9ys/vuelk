<template>
  <div class="wrapper">
    <PageHeader class="header">Передача пациента</PageHeader>
    <AvaComponent></AvaComponent>
    <form action="" class="form">
      <AuthInput
          v-for="(el, index) in inputs"
          :key="index"
          :inputInfo ="el"
      ></AuthInput>

      <BlueBtn
          class="btn"
          :arrow = "true"
          @click="$router.push('/send_success')"
      >Передать </BlueBtn>
    </form>
  </div>
</template>

<script>
import PageHeader from "@/components/ui/PageHeader";
import AvaComponent from "@/components/AvaComponent";
import AuthInput from "@/components/ui/input/AuthInput";
import BlueBtn from "@/components/ui/btn/BlueBtn";

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
      inputs: [
        { f_icon: require('@/assets/icon/form/fio.svg'), title: 'Фамилия', l_icon: ''},
        { f_icon: require('@/assets/icon/form/fio.svg'), title: 'Имя', l_icon: ''},
        { f_icon: require('@/assets/icon/form/fio.svg'), title: 'Отчество', l_icon: ''},
        { f_icon: require('@/assets/icon/form/phone.svg'), title: 'Мобильный телефон', l_icon: ''},
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
    padding-top: 35px;
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