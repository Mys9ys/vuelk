<template>
  <div class="wrapper">
    <div class="header">
      <div class="title">Бонусы</div>
      <select v-model="selected" @change="selectedChange()" class="filter_select">
        <option v-for="(option, i) in options" :value="option.value" :key="i">
          {{ option.text }}
        </option>
      </select>
    </div>

    <div class="sub_header">
      <div class="title">Январь 2023</div>
      <div class="filter"><span>223 000</span> <span class="b_icon">ᴃ</span></div>
    </div>

    <div class="bonuses">

      <div class="date_block" v-for="(arItems, index) in $store.state.bonuses" :key="index">
        <div class="title">{{arItems.day.split('.')[1]}} {{$store.state.month[+arItems.day.split('.')[0]-1]}}</div>

        <PatientBonus
            v-for="(el, index) in arItems.patients"
            :key="index"
            :el="el"
        ></PatientBonus>
      </div>
    </div>

    <div class="footer">
      <PaginationBlock></PaginationBlock>
    </div>


  </div>
  <LKNavbar
      :active_route="this.$route.path"
  ></LKNavbar>
</template>

<script>
import PatientBonus from "@/components/PatientBonus";
import PaginationBlock from "@/components/ui/PaginationBlock";
import LKNavbar from "@/components/LKNavbar";

export default {
  name: "BonusPage",
  components: {
    PatientBonus,
    PaginationBlock,
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
  methods: {
    selectedChange() {

    },
  }
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
.wrapper {
  .wrapper_template;
  padding-bottom: 70px;
  overflow-y: scroll;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 12px;

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
  .sub_header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 12px;

    .title{
      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
      /* identical to box height, or 138% */


      /* Черный */

      color: #000000;
    }
    .filter {
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      /* identical to box height, or 157% */

      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 4px;

      text-align: right;
      letter-spacing: -0.408px;

      /* Серый */
      color: #8A8A8E;
    }
  }
  .bonuses{
    padding-bottom: 45px;
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

.b_icon{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 20px;
  height: 26px;

}
</style>