<template>
  <div class="wrapper">
    <div class="header">
      <div class="title">Пациенты</div>
      <select v-model="selected" class="filter_select">
        <option v-for="(name, index) in periods" :value="index" :key="index">
          {{ name }}
        </option>
      </select>
    </div>

    <div v-if="loader">
      <LoaderMini></LoaderMini>
    </div>
    <div class="loader_wrapper" v-else>
      <!-- 1 Подгрузка блока после получения данных-->
      <div class="patients" v-if="patientList">
        <div class="title title_bottom">Последние переданные пациенты</div>

        <!-- 2 разбиение массива пациентов на периоды для фильтра-->
        <div class="period_wrapper_for" v-for="(name,period) in periods" :key="period">
          <div class="period_wrapper" v-if="period === selected">

            <div class="empty_wrapper_" v-if="patientList[period]">
              <!-- 3 разбиение массива пациентов заданного периода на страницы пагинации-->
              <div class="patient_wrapper_for" v-for="(arPeriod,pageNumber) in patientList[period]" :key="pageNumber" >
                <div class="patient_wrapper" v-if="pagination[period] == pageNumber">
                  <!-- 4 разбиение по датам-->
                  <div class="date_block" v-for="(arr, date) in arPeriod" :key="date">
                    <div class="title">{{formatDate(date)}}</div>
                    <PatientEl
                        v-for="(el, index) in arr"
                        :key="index"
                        :el="el"
                    ></PatientEl>
                  </div>
                  <!-- 4 end-->

                </div>
              </div>
              <!-- 3 end-->
            </div>
            <div class="empty_wrapper" v-else>
              Нет переданных пациентов за выбранный период
            </div>

          </div>
        </div>
        <!-- 2 end-->

      </div>
      <!-- 1 end-->
      <div v-else>
        <div>Вы еще не передавали пациентов</div>
      </div>
    </div>

    <div class="footer">
      <div class="pagination_wrapper" v-if="max">
        <div class="pagination_wrapper_for" v-for="(count, period) in max" :key="period">
          <PaginationBlock
              :max="count"
              @updatePagination="changePagination"
              v-if="period == selected"
              ref="pagination"
              :name="period"
          ></PaginationBlock>
        </div>
      </div>

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
import {mapActions, mapState} from "vuex";
import LoaderMini from "@/components/ui/LoaderMini";

export default {
  name: "PatientsPage",
  components: {
    BlueBtn,
    PaginationBlock,
    PatientEl,
    LKNavbar,
    LoaderMini
  },
  data() {
    return {
      selected: 'all',

      periods: {
        'all': 'За все время',
        'week': 'Последняя неделя',
        'month': 'Последний месяц',
        'half': 'Последние полгода',
        'year': 'Последний год',
      },
      patientList: false,
      loader: false,

      pagination: {},

      max: {},
    }
  },

  mounted() {
    this.$nextTick(function () {
      this.loader = true
      this.getPatientList()
    })
  },
  watch:{
    arPatientList(){
      this.patientList = this.arPatientList ?? false

      let keys = Object.keys(this.patientList)

      keys.forEach(key=>{
        this.max[key] = Object.keys(this.patientList[key]).length
        this.pagination[key] = 1
      })
    }
  },

  methods: {
    ...mapActions({
      getProfileInfoRequest: 'info/getProfileInfoRequest',
    }),

    formatDate(date){
      let ar = date.split('.')
      return Number(ar[0]) + ' ' + this.month[Number(ar[1])-1]
    },

    changePagination(data){
      this.pagination[this.$refs.pagination[0].name] = data.pagination
    },

    async getPatientList(){
      this.infoRequestData.token = this.token
      this.infoRequestData.type = 'list'

      await this.getProfileInfoRequest()

      this.loader = false
    },

  },
  computed: {
    ...mapState({
      token: state => state.auth.authData.token,
      infoRequestData: state => state.info.infoRequestData,
      arPatientList: state => state.info.requestInfo,
      month: state => state.month
    })
  },
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
    .title_bottom{
      margin-bottom: 25px;
    }
  }
  .date_block{
    .title{
      font-weight: 600;
      font-size: 12px;
      line-height: 22px;
      text-align:left;
      /* identical to box height, or 183% */

      /* Черный */

      color: #000000;
    }
  }
  .footer{
    width: 100%;
    position: fixed;
    bottom: 45px;
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

.empty_wrapper{
  margin-top: 25px;
  font-size: 13px;
}
</style>