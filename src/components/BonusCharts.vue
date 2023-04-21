<template>
  <div style="height: 150px;">
    <canvas ref="myChart" width="100%"></canvas>
  </div>
</template>

<script>
import {Chart} from "chart.js/auto";
export default {
  name: "BonusCharts",
  props: {
    selectData: {
      type: Object
    }
  },

  data(){
    return{
      config : {
        type: 'bar',
        data: {
          labels: this.selectData.labels,
          datasets: [
            {
              label: false,
              data: this.selectData.data,
              backgroundColor: '#43BAC0',
              borderRadius: 3,
              barThickness: 4,
              scales: {
                y: {
                  grid: {
                    offset: true
                  },
                }
              }
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          }
        }
      },
      //

    }
  },
  mounted() {
    const myChart = new Chart(this.$refs.myChart, this.config)
    myChart.render()

  },
}
</script>

<style scoped>

</style>