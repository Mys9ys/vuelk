<template>
  <div class="wrapper">
    <div class="bonus_block">
      <div class="header">
        <div class="title">Бонусы</div>
        <select v-model="selected" @change="selectedChange()" class="filter_select">
          <option v-for="(option, i) in options" :value="option.value" :key="i">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div v-for="(data, index) in chartData" :key="index">
        <BonusCharts v-if="selected==index" :selectData="data"></BonusCharts>
      </div>

      <div class="bonus_footer">
        <div class="bonus_sum">{{setNumberSeparate(chartData[selected]["data"])}} <RubIco style="width: 28px"></RubIco></div>
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
  <LKNavbar
      :active_route="this.$route.path"
  ></LKNavbar>
</template>

<script>
import BlueBlurBtn from "@/components/ui/btn/BlueBlurBtn";
import RubIco from "@/components/ui/RubIco";
import BlueBtn from "@/components/ui/btn/BlueBtn";
import BonusCharts from "@/components/BonusCharts";
import PatientEl from "@/components/PatientEl";
import LKNavbar from "@/components/LKNavbar";

export default {
  name: "MainPage",
  components: {BonusCharts, BlueBlurBtn, RubIco, BlueBtn, PatientEl, LKNavbar},
  data() {
    return {
      chartData: {
        week: {
          labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
          data: [0, 0, 0, 0, 0, 0, 0]
        },
        month: {
          labels: [1,	2,	3,	4,	5,	6,	7,	8,	9,	10,	11,	12,	13,	14,	15,	16,	17,	18,	19,	20,	21,	22,	23,	24,	25,	26,	27,	28,	29,	30,	31],
          data: [1000,	2000,	0,	0,	0,	0,	15000,	0,	0,	1000,	3000,	0,	0,	1000,	2000,	0,	0,	5000,	0,	0,	2000,	0,	0,	4000,	0,	0,	0,	0,	0,	0,	1000,
          ]
        },
        half_year: {
          labels: ['ноя','дек','янв','фев','мар','апр'],
          data: [17000, 23000, 7000, 30000, 45000, 5000]
        },
        year: {
          labels: ['май','июн','июл','авг','сен','окт','ноя','дек','янв','фев','мар','апр'],
          data: [26000, 23000, 17000, 12000, 31000, 25000,17000, 23000, 7000, 30000, 45000, 5000]
        }
      },

      selected: 'week',
      options: [
        { text: 'Последняя неделя', value: 'week' },
        { text: 'Последний месяц', value: 'month' },
        { text: 'Последние полгода', value: 'half_year' },
        { text: 'Последний год', value: 'year' },
      ]
    }
  },
  methods: {
    selectedChange(){

    },

    setNumberSeparate(number){
      number = number.reduce((partialSum, a) => partialSum + a, 0)
      return ("" + number).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function($1) { return $1 + " " });
    }
  }
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
.wrapper {
  .wrapper_template;
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

      .filter_select{
        .filter_template;
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