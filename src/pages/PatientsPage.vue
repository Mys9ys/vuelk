<template>
  <div class="wrapper">
    <div class="header">
      <div class="title">Пациенты</div>
      <div class="filter">Дата <img src="@/assets/icon/btn/arrow_down.svg" alt=""></div>
    </div>
    <div class="patients">

      <div class="date_block" v-for="(arItems, index) in $store.state.arPatients" :key="index">
        <div class="title">{{arItems.day.split('.')[1]}} {{$store.state.month[+arItems.day.split('.')[0]-1]}}</div>

        <PatientEl
            v-for="(el, index) in arItems.patients"
            :key="index"
            :el="el"
        ></PatientEl>
      </div>
    </div>
    <div class="footer">
      <PaginationBlock></PaginationBlock>
      <BlueBtn class="btn_margin" :arrow="true" @click="$router.push('/patient_send')">Передать нового пациента</BlueBtn>
    </div>
  </div>
</template>

<script>
import BlueBtn from "@/components/ui/btn/BlueBtn";
import PaginationBlock from "@/components/ui/PaginationBlock";
import PatientEl from "@/components/PatientEl";

export default {
  name: "PatientsPage",
  components: {
    BlueBtn,
    PaginationBlock,
    PatientEl
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
  padding-bottom: 48px;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 22px;

    .title {
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      /* identical to box height, or 138% */

      letter-spacing: -0.408px;

      /* Черный */
      color: #000000;
    }

    .filter {
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      /* identical to box height, or 157% */

      display: flex;
      flex-direction: row;
      gap: 12px;

      text-align: right;
      letter-spacing: -0.408px;

      /* Серый */
      color: #8A8A8E;
    }
  }
  .date_block{
    .title{
      font-weight: 600;
      font-size: 12px;
      line-height: 22px;
      text-align:left;
      /* identical to box height, or 183% */

      letter-spacing: -0.408px;

      /* Черный */

      color: #000000;
    }
  }
  .footer{
    width: calc(100% - 48px);
    position: absolute;
    bottom: 71px;
  }
}
</style>