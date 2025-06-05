import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  ChartComponent,
  NgApexchartsModule
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  fill: ApexFill;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  colors: string[];
  plotOptions: any
};

@Component({
  selector: 'app-stacked-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div id="chart">
      <apx-chart
        [series]="chartOptions.series!"
        [chart]="chartOptions.chart!"
        [xaxis]="chartOptions.xaxis!"
        [yaxis]="chartOptions.yaxis!"
        [dataLabels]="chartOptions.dataLabels!"
        [stroke]="chartOptions.stroke!"
        [fill]="chartOptions.fill!"
        [tooltip]="chartOptions.tooltip!"
        [legend]="chartOptions.legend!"
        [colors]="chartOptions.colors!"
        [plotOptions]="chartOptions.plotOptions"
      ></apx-chart>
    </div>
  `,
  styles: ``
})
export class StackedChartComponent {
@ViewChild('chart') chart!: ChartComponent;

  @Input() width!: number;
  @Input() height: number = 400;

   public chartOptions: Partial<ChartOptions> = {
    series: [
      {
        name: 'Revenue',
        data: [400, 430, 448, 470, 540, 580, 690, 690, 720, 750, 800, 850]
      },
      {
        name: 'Active Users',
        data: [300, 320, 350, 400, 410, 450, 460, 480, 500, 520, 540, 560]
      }
    ],
    chart: {
      type: 'bar',
      height: this.height,
      width: this.width,
      stacked: true,
      toolbar: {
        show: false
      }
    },
    colors: ['#3479E9', '#DCEBFE'],
    plotOptions:{
      bar: {
        // borderRadius: 2
      }
    },
    xaxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
      title: {
        text: 'Months',
        style: {
          fontWeight: 'normal'
        }
      }
    },
    yaxis: {
      min: 200,
      max: 1000,
      tickAmount: 4,
      title: {
        text: 'Volume',
        style: {
          fontWeight: 'normal'
        }
      }
    },
    dataLabels: {
      enabled: false,
      
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} units`
      }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -30,
      // customLegendItems: ['Revenue', 'Active Users'],
      // showForSingleSeries: true,
    }
  };

  ngOnInit() {
    this.chartOptions.chart!.height = this.height;
    this.chartOptions.chart!.width = this.width;
    this.chartOptions.colors = ['#3479E9', '#DCEBFE'];
  }
}
