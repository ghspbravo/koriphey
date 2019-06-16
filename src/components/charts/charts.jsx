import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js';
// eslint-disable-next-line no-unused-vars
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { useStore } from 'easy-peasy';

const options = {
  legend: {
    position: 'right',
    labels: {
      boxWidth: 10,
      fontSize: 10
    }
  },
  tooltips: {
    enabled: false
  },
  plugins: {
    datalabels: {
      formatter: function (value, context) {
        return value + '%';
      }
    }
  }
}

export function WorkDoughnutChart() {
  const statistics = useStore(store => store.statistics.statistics)

  const workChart = useRef()

  useEffect(() => {
    if (Object.entries(statistics).length === 0) return
    let counter = 0

    statistics.competenciesCount.forEach(item => counter += item.count)

    const workDoughnutChart = new Chart(workChart.current, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: statistics.competenciesCount.map(item => Math.round(item.count / counter * 100)),
          backgroundColor: [
            '#252D33',    // color for data at index 0
            '#3C6374',
            '#E56000',   // color for data at index 1
            '#E5600066',  // color for data at index 2
            '#E5600022',  // color for data at index 3
            //...
          ],
          datalabels: {
            color: ['white', 'white', 'white', 'black']
          }
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: statistics.competenciesCount
          .map(item => item.competence.slice(0, 20) + (item.competence.length <= 20 ? '' : '...'))
      },
      options: options
    });
    return () => {
      workDoughnutChart.destroy();
    }
  }, [statistics])

  return (
    <canvas ref={workChart}></canvas>
  )
}

export function HobbiesDoughnutChart() {
  const statistics = useStore(store => store.statistics.statistics)
  const hobbiesChart = useRef()

  useEffect(() => {
    if (Object.entries(statistics).length === 0) return
    let counter = 0

    statistics.hobbyCount.forEach(item => counter += item.count)

    const hobbiesDoughnutChart = new Chart(hobbiesChart.current, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: statistics.hobbyCount.map(item => Math.round(item.count / counter * 100)),
          backgroundColor: [
            '#252D33',    // color for data at index 0
            '#3C6374',
            '#3C637433',   // color for data at index 1
            '#E5600022',  // color for data at index 3
            '#E5600066',
            '#E56000',  // color for data at index 2
            //...
          ],
          datalabels: {
            color: ['white', 'white', 'black', 'black', 'black', 'white']
          }
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: statistics.hobbyCount.map(item => item.hobby.slice(0, 20) + (item.hobby.length <= 20 ? '' : '...')),
      },
      options: options
    });
    return () => {
      hobbiesDoughnutChart.destroy();
    }
  }, [statistics])

  return (
    <canvas ref={hobbiesChart}></canvas>
  )
}
