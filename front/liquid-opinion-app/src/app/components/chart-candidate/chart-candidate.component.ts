import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Color, Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {FakeData} from '../../utils/fake.data';
import * as moment from 'moment';

// import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart-candidate',
  templateUrl: './chart-candidate.component.html',
  styleUrls: ['./chart-candidate.component.scss']
})
export class ChartCandidateComponent implements OnInit, AfterViewInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        display: false,
        stacked: true,
        ticks: {
          min: 0,
          max: 100,
        },
      }, {
        id: 'moyenne',
        display: false,
        ticks: {
          min: 0,
          max: 5,
        }
      }],
      xAxes: [{
        gridLines: {display: false},
        stacked: true,
      }]
    },
    plugins: {
      // datalabels: {
      //   anchor: 'end',
      //   align: 'end',
      // }
    }
  };
  public barChartLabels: Label[] = [
    moment().subtract(14, 'days').format('DD/MM'),
    moment().subtract(13, 'days').format('DD/MM'),
    moment().subtract(12, 'days').format('DD/MM'),
    moment().subtract(11, 'days').format('DD/MM'),
    moment().subtract(10, 'days').format('DD/MM'),
    moment().subtract(9, 'days').format('DD/MM'),
    moment().subtract(8, 'days').format('DD/MM'),
    moment().subtract(7, 'days').format('DD/MM'),
    moment().subtract(6, 'days').format('DD/MM'),
    moment().subtract(5, 'days').format('DD/MM'),
    moment().subtract(4, 'days').format('DD/MM'),
    moment().subtract(3, 'days').format('DD/MM'),
    moment().subtract(2, 'days').format('DD/MM'),
    moment().subtract(1, 'days').format('DD/MM'),
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartColors;
  // public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[];
  gradient1 = '#e8554e';
  gradient2 = '#f19c65';
  gradient3 = '#ffd265';
  gradient4 = '#2aa876';
  gradient5 = '#0a7b83';
  gradient6 = '#353535';

  constructor() {
    const d1 = FakeData.createFakeOneDayStat();
    const d2 = FakeData.createFakeOneDayStat();
    const d3 = FakeData.createFakeOneDayStat();
    const d4 = FakeData.createFakeOneDayStat();
    const d5 = FakeData.createFakeOneDayStat();
    const d6 = FakeData.createFakeOneDayStat();
    const d7 = FakeData.createFakeOneDayStat();
    const d8 = FakeData.createFakeOneDayStat();
    const d9 = FakeData.createFakeOneDayStat();
    const d10 = FakeData.createFakeOneDayStat();
    const d11 = FakeData.createFakeOneDayStat();
    const d12 = FakeData.createFakeOneDayStat();
    const d13 = FakeData.createFakeOneDayStat();
    const d14 = FakeData.createFakeOneDayStat();
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    this.barChartData = [
      {
        label: 'moyenne',
        data: [d1[5], d2[5], d3[5], d4[5], d5[5], d6[5], d7[5], d8[5], d9[5], d10[5], d11[5], d12[5], d13[5], d14[5]],
        type: 'line',
        yAxisID: 'moyenne',
        borderColor: this.gradient6,
        pointBorderColor: this.gradient6,
        pointBackgroundColor: this.gradient6,
        pointHoverBackgroundColor: this.gradient6,
        pointHoverBorderColor: this.gradient6,
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        fill: false,
        borderWidth: 2,
      }, {
        label: 'à rejeter',
        barPercentage: 1.0,
        categoryPercentage: 1.0,
        data: [d1[4], d2[4], d3[4], d4[4], d5[4], d6[4], d7[4], d8[4], d9[4], d10[4], d11[4], d12[4], d13[4], d14[4]],
        borderColor: this.gradient1,
        backgroundColor: this.gradient1,
        pointBorderColor: this.gradient1,
        pointBackgroundColor: this.gradient1,
        pointHoverBackgroundColor: this.gradient1,
        pointHoverBorderColor: this.gradient1,
      }, {
        label: 'mauvais',
        barPercentage: 1.0,
        categoryPercentage: 1.0,
        data: [d1[3], d2[3], d3[3], d4[3], d5[3], d6[3], d7[3], d8[3], d9[3], d10[3], d11[3], d12[3], d13[3], d14[3]],
        borderColor: this.gradient2,
        backgroundColor: this.gradient2,
        pointBorderColor: this.gradient2,
        pointBackgroundColor: this.gradient2,
        pointHoverBackgroundColor: this.gradient2,
        pointHoverBorderColor: this.gradient2,
      }, {
        label: 'neutre',
        barPercentage: 1.0,
        categoryPercentage: 1.0,
        data: [d1[2], d2[2], d3[2], d4[2], d5[2], d6[2], d7[2], d8[2], d9[2], d10[2], d11[2], d12[2], d13[2], d14[2]],
        borderColor: this.gradient3,
        backgroundColor: this.gradient3,
        pointBorderColor: this.gradient3,
        pointBackgroundColor: this.gradient3,
        pointHoverBackgroundColor: this.gradient3,
        pointHoverBorderColor: this.gradient3,
      }, {
        label: 'bien',
        barPercentage: 1.0,
        categoryPercentage: 1.0,
        data: [d1[1], d2[1], d3[1], d4[1], d5[1], d6[1], d7[1], d8[1], d9[1], d10[1], d11[1], d12[1], d13[1], d14[1]],
        borderColor: this.gradient4,
        backgroundColor: this.gradient4,
        pointBorderColor: this.gradient4,
        pointBackgroundColor: this.gradient4,
        pointHoverBackgroundColor: this.gradient4,
        pointHoverBorderColor: this.gradient4,
      }, {
        label: 'excellent',
        barPercentage: 1.0,
        categoryPercentage: 1.0,
        data: [d1[0], d2[0], d3[0], d4[0], d5[0], d6[0], d7[0], d8[0], d9[0], d10[0], d11[0], d12[0], d13[0], d14[0]],
        borderColor: this.gradient5,
        backgroundColor: this.gradient5,
        pointBorderColor: this.gradient5,
        pointBackgroundColor: this.gradient5,
        pointHoverBackgroundColor: this.gradient5,
        pointHoverBorderColor: this.gradient5,
      }
    ];
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  // events
  // public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
  // }

  // public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
  // }
}
