import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart-view.js';
import {countPricesByType, countTypes, countTimeSpend, countTimeSpendInMs, TYPES} from '../utils/stats.js';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const renderMoneyChart = (moneyCtx, points) => {
  const arrayLabel = ['TAXI', 'BUS', 'TRAIN', 'SHIP', 'DRIVE', 'FLIGHT', 'CHECK-IN', 'SIGHTSEEING', 'RESTAURANT'];
  const prices = Object.values(countPricesByType(points, TYPES));

  const arrayOfObj = arrayLabel.map((d, i) => ({
    label: d,
    data: prices[i] || 0
  }));

  const sortedArrayOfObj = arrayOfObj.sort((a, b) => b.data - a.data);

  const newSortedLabels = [];
  const newSortedPrices = [];
  sortedArrayOfObj.forEach((d)=> {
    newSortedLabels.push(d.label);
    newSortedPrices.push(d.data);
  });

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: newSortedLabels,
      datasets: [{
        data: newSortedPrices,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        minBarLength: 80,
        barThickness: 44
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (tripPrice) => `€ ${tripPrice}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypeChart = (typeCtx, points) => {
  const arrayLabel = ['TAXI', 'BUS', 'TRAIN', 'SHIP', 'DRIVE', 'FLIGHT', 'CHECK-IN', 'SIGHTSEEING', 'RESTAURANT'];
  const types = Object.values(countTypes(points, TYPES));

  const arrayOfObj = arrayLabel.map((d, i) => ({
    label: d,
    data: types[i] || 0
  }));

  const sortedArrayOfObj = arrayOfObj.sort((a, b) => b.data - a.data);

  const newSortedLabels = [];
  const newSortedTypes = [];
  sortedArrayOfObj.forEach((d)=> {
    newSortedLabels.push(d.label);
    newSortedTypes.push(d.data);
  });

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: newSortedLabels,
      datasets: [{
        data: newSortedTypes,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        minBarLength: 80,
        barThickness: 44
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (type) => `${type}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (timeCtx, points) => {
  const arrayLabel = ['TAXI', 'BUS', 'TRAIN', 'SHIP', 'DRIVE', 'FLIGHT', 'CHECK-IN', 'SIGHTSEEING', 'RESTAURANT'];
  const timeSpendInMs = Object.values(countTimeSpendInMs(points, TYPES));

  const arrayOfObj = arrayLabel.map((d, i) => ({
    label: d,
    data: timeSpendInMs[i] || 0
  }));

  const sortedArrayOfObj = arrayOfObj.sort((a, b) => b.data - a.data);

  const newSortedLabels = [];
  const newSortedSpentTimes = [];
  sortedArrayOfObj.forEach((d)=> {
    newSortedLabels.push(d.label);
    newSortedSpentTimes.push(d.data);
  });

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: newSortedLabels,
      datasets: [{
        data: newSortedSpentTimes,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        minBarLength: 90,
        barThickness: 44
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (timeSpendInMsEach) => countTimeSpend(timeSpendInMsEach),
        },
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticsTemplate = () => (`<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>
          <div class="statistics__item">
            <canvas class="statistics__chart" id="money" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="type" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="time" width="900"></canvas>
          </div>
        </section>`);

export default class StatsView extends SmartView {
  #moneyChart = null;
  #typeChart = null;
  #timeChart = null;

  constructor(points) {
    super();

    this._data = points;

    this.#setCharts();
  }

  get template() {
    return createStatisticsTemplate(this._data);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#moneyChart) {
      this.#moneyChart.destroy();
      this.#moneyChart = null;
    }

    if (this.#typeChart) {
      this.#typeChart.destroy();
      this.#typeChart = null;
    }
    if (this.#timeChart) {
      this.#timeChart.destroy();
      this.#timeChart = null;
    }
  }

  restoreHandlers = () => {
    this.#setCharts();
  }

  #setCharts = () => {
    const points = this._data;

    const moneyCtx = this.element.querySelector('#money');
    const typeCtx = this.element.querySelector('#type');
    const timeCtx = this.element.querySelector('#time');

    const BAR_WIDTH = points.length;
    moneyCtx.width = BAR_WIDTH * 5;
    typeCtx.width = BAR_WIDTH * 5;
    timeCtx.width = BAR_WIDTH * 5;

    this.#moneyChart = renderMoneyChart(moneyCtx, points);
    this.#typeChart = renderTypeChart(typeCtx, points);
    this.#timeChart = renderTimeChart(timeCtx, points);

  }
}

