import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js';
// eslint-disable-next-line no-unused-vars
import ChartDataLabels from 'chartjs-plugin-datalabels';

const options = {
  legend: {
    position: 'right'
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
  const workChart = useRef()

  useEffect(() => {
    const workDoughnutChart = new Chart(workChart.current, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [51, 26, 12, 11],
          backgroundColor: [
            '#252D33',    // color for data at index 0
            '#E56000',   // color for data at index 1
            '#E5600066',  // color for data at index 2
            '#E5600022',  // color for data at index 3
            //...
          ],
          datalabels: {
            color: ['white', 'white', 'black']
          }
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Экономика',
          'IT',
          'Журналистика',
          'Другое'
        ]
      },
      options: options
    });
    return () => {
      workDoughnutChart.destroy();
    }
  }, [])

  return (
    <canvas ref={workChart}></canvas>
  )
}

export function HobbiesDoughnutChart() {
  const hobbiesChart = useRef()

  useEffect(() => {
    const hobbiesDoughnutChart = new Chart(hobbiesChart.current, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [40, 26, 12, 11, 11],
          backgroundColor: [
            '#252D33',    // color for data at index 0
            '#3C6374',
            '#3C637433',   // color for data at index 1
            '#E5600022',  // color for data at index 3
            '#E56000',  // color for data at index 2
            //...
          ],
          datalabels: {
            color: ['white', 'white', 'black', 'black', 'white']
          }
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Путешествия',
          'Спорт',
          'Кулинария',
          'Театр',
          'Другое'
        ]
      },
      options: options
    });
    return () => {
      hobbiesDoughnutChart.destroy();
    }
  }, [])

  return (
    <canvas ref={hobbiesChart}></canvas>
  )
}
