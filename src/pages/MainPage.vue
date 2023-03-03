<template>
  <div class="wrapper">
    <div class="bonus_block">
      <div class="bonus_header">
        <div class="bonus_title">Бонусы</div>
        <div class="bonus_filter">Последняя неделя <img src="@/assets/icon/btn/arrow_down.svg" alt=""></div>
      </div>
      <BonusChart :chartdata="chartData" :options="chartOptions"></BonusChart>
    </div>
  </div>
</template>

<script>
import BonusChart from "@/components/BonusCharts";
export default {
  name: "MainPage",
  components: {BonusChart},
  data () {
    return {
      chartData: {
        labels: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
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

  .bonus_block {
    .bonus_header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .bonus_title{
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        /* identical to box height, or 138% */

        letter-spacing: -0.408px;

        /* Черный */
        color: #000000;
      }
      .bonus_filter{
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
}
</style>