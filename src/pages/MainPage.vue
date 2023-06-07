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

      <div class="bonus_footer" v-if="chartData.week">
        <div class="bonus_sum">{{setNumberSeparate(chartData[selected]["data"])}} <RubIco style="width: 28px"></RubIco></div>
        <BlueBlurBtn @click="$router.push('/bonus')">Подробнее</BlueBlurBtn>
      </div>
    </div>
    <BlueBtn class="btn_margin" :arrow="true" @click="$router.push('/patient_send')">Передать нового пациента</BlueBtn>

    <div v-if="loader">
      <LoaderMini></LoaderMini>
    </div>
    <div class="loader_wrapper" v-else>
      <div class="patients" v-if="lastPatients">
        <div class="title">Последние переданные пациенты</div>
        <PatientEl
            v-for="(el, index) in lastPatients"
            :key="index"
            :el="el"
        ></PatientEl>
      </div>

      <div v-else>
        <div>Вы еще не передавали пациентов</div>
      </div>
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
import {mapActions, mapState} from "vuex";
import LoaderMini from "@/components/ui/LoaderMini";

export default {
  name: "MainPage",
  components: {BonusCharts, BlueBlurBtn, RubIco, BlueBtn, PatientEl, LKNavbar, LoaderMini},
  data() {
    return {
      chartData: {},

      selected: 'week',
      options: [
        { text: 'Последняя неделя', value: 'week' },
        { text: 'Последний месяц', value: 'month' },
        { text: 'Последние полгода', value: 'half' },
        { text: 'Последний год', value: 'year' },
      ],
      lastPatients:false,
      loader: false
    }
  },

  mounted() {
    this.$nextTick(function () {
      this.loader = true
      this.getLastPatients()
    })
  },

  watch:{
    arLastPatients(){
      this.lastPatients = this.arLastPatients ?? false
    },
  },

  methods: {
    ...mapActions({
      getProfileInfoRequest: 'info/getProfileInfoRequest',
    }),

    async getLastPatients(){
      this.infoRequestData.token = this.token
      this.infoRequestData.type = 'last'

      await this.getProfileInfoRequest()

      this.chartData = this.chartDataRes

      this.loader = false
    },

    setNumberSeparate(number){
      number = number.reduce((partialSum, a) => partialSum + a, 0)
      return ("" + number).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function($1) { return $1 + " " });
    }
  },
  computed: {
    ...mapState({
      token: state => state.auth.authData.token,
      infoRequestData: state => state.info.infoRequestData,
      arLastPatients: state => state.info.requestInfo,
      chartDataRes: state => state.info.chartData,
    })
  },
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
.wrapper {
  .wrapper_template;
  overflow-y:scroll;
  padding-bottom: 65px;

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

        margin-bottom: 25px;
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