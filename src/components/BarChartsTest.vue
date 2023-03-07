<template>
  <div style="height: 150px;">
    <canvas id="myChart" width="100%"></canvas>
  </div>
</template>

<script>
import {Chart} from "chart.js/auto";

export default {
  name: "BarChartsTest",
  mounted() {
    const data = [
      { day: 'Пн', count: 15000 },
      { day: 'Вт', count: 0 },
      { day: 'Ср', count: 1000 },
      { day: 'Чт', count: 30000 },
      { day: 'Пт', count: 45000 },
      { day: 'Сб', count: 5000 },
      { day: 'Вс', count: 2000 },
    ]
    data
    const config = {
      type: 'bar',
      data: {
        // labels: data.map(row => row.day),
        labels: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
        datasets: [
          {
            label: false,
            // data: data.map(row => row.count)
            data: [15000, 0, 1000, 20000, 45000, 5000, 2000],
            backgroundColor: '#43BAC0',
            borderRadius: 3,
            barThickness: 4,
            // clip: 7,
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
    }
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, config)
    myChart
  }
}
</script>

<style scoped>

</style>