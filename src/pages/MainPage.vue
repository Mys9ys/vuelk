<template>
  <div class="wrapper">
    <div class="bonus_block">
      <div class="header">
        <div class="title">Бонусы</div>
        <div class="filter">Последняя неделя <img src="@/assets/icon/btn/arrow_down.svg" alt=""></div>
      </div>
      <BonusCharts></BonusCharts>
      <div class="bonus_footer">
        <div class="bonus_sum">136 000 <RubIco style="width: 28px"></RubIco></div>
        <BlueBlurBtn @click="$router.push('/bonus')">Подробнее</BlueBlurBtn>

      </div>
    </div>
    <BlueBtn class="btn_margin" :arrow="true" @click="$router.push('/patient_send')">Передать нового пациента</BlueBtn>

    <div class="patients">
      <div class="title">Последние переданные пациенты</div>
      <PatientEl
          v-for="(el, index) in $store.state.patients"
          :key="index"
          :el="el"
      ></PatientEl>

    </div>
  </div>
</template>

<script>
import BlueBlurBtn from "@/components/ui/btn/BlueBlurBtn";
import RubIco from "@/components/ui/RubIco";
import BlueBtn from "@/components/ui/btn/BlueBtn";
import BonusCharts from "@/components/BonusCharts";
import PatientEl from "@/components/PatientEl";

export default {
  name: "MainPage",
  components: {BonusCharts, BlueBlurBtn, RubIco, BlueBtn, PatientEl},
  data() {
    return {
      chartData: {
        labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        datasets: {
          data: [15000, 0, 1000, 30000, 45000, 5000, 2000]
        },
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
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
  padding-bottom: 48px;
  overflow-y:scroll;

  .bonus_block {

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
  }
  .bonus_footer{
    margin-top: 17px;
    padding-bottom: 22px;
    border-bottom: 1px solid #E7E7E7;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    align-items: center;

    .bonus_sum{
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5px;
      font-weight: 900;
      font-size: 32px;
      line-height: 22px;
      /* identical to box height, or 69% */

      letter-spacing: -0.408px;

      /* Черный */

      color: #000000;
    }
  }
  .btn_margin{
    margin-top: 22px;
    margin-bottom: 22px;
  }
  .patients{
    text-align: left;
    border-top: 1px solid #E7E7E7;
    padding-top: 22px;
    .title{
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      /* identical to box height, or 138% */

      letter-spacing: -0.408px;

      /* Черный */

      color: #000000;
    }
  }
}
</style>