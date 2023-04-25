<template>
  <div class="wrapper">
    <div class="header">
      <div class="title">Пациенты</div>
      <select v-model="selected" @change="selectedChange()" class="filter_select">
        <option v-for="(option, i) in options" :value="option.value" :key="i">
          {{ option.text }}
        </option>
      </select>
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
  <LKNavbar
      :active_route="this.$route.path"
  ></LKNavbar>
</template>

<script>
import BlueBtn from "@/components/ui/btn/BlueBtn";
import PaginationBlock from "@/components/ui/PaginationBlock";
import PatientEl from "@/components/PatientEl";
import LKNavbar from "@/components/LKNavbar";
import {mapActions} from "vuex";

export default {
  name: "PatientsPage",
  components: {
    BlueBtn,
    PaginationBlock,
    PatientEl,
    LKNavbar
  },
  data() {
    return {
      selected: 'week',
      options: [
        {text: 'Последняя неделя', value: 'week'},
        {text: 'Последний месяц', value: 'month'},
        {text: 'Последние полгода', value: 'half_year'},
        {text: 'Последний год', value: 'year'},
      ]
    }
  },

  mounted() {
    //
    this.$nextTick(function () {
      this.getProfileInfo()
    })
  },
  methods: {
    ...mapActions({
      getProfileInfoRequest: 'info/getProfileInfoRequest',
    }),

    selectedChange() {

    },

  }
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
.wrapper {
  .wrapper_template;
  overflow-y: scroll;

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

      /* Черный */
      color: #000000;
    }

    .filter_select{
      .filter_template;
    }
  }
  .patients{
    padding-bottom: 145px;
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
    width: 100%;
    position: fixed;
    bottom: 67px;
    display: flex;
    flex-direction: column;
    gap: 21px;
    background: #fff;
    left: 50%;
    transform: translateX(-50%);
    padding: 15px 24px;
    padding-bottom: 21px;
  }
}
</style>