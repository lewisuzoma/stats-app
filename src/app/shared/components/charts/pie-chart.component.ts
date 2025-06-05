import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit, ViewChild } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ApexTitleSubtitle, ApexTheme, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  theme: ApexTheme;
  responsive: ApexResponsive[];
  labels: any;
  colors: any[];
  plotOptions: any;
};

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div id="chart">
      <apx-chart
        [series]="chartOptions.series"
        [chart]="chartOptions.chart"
        [labels]="chartOptions.labels"
        [plotOptions]="chartOptions.plotOptions"
        [dataLabels]="chartOptions.dataLabels"
        [legend]="chartOptions.legend"
        [responsive]="chartOptions.responsive"
        [colors]="chartOptions.colors"
      ></apx-chart>
    </div>
  `,
  styles: ``
})
export class PieChartComponent implements OnInit{
  @Input() width: number = 200
  @Input() height!: number
  @Input() chartLabels!: Array<string>
  @Input() chartColors!: Array<string>
  @Input() seriesData!: Array<any>
  @Input() showDataLabels: boolean = false // Toggle dataLabel show/hide - Default is FALSE
  @Input() chartTotalLabel: string = 'Monthly Budget'
  @Input() showChartTotalLabel: boolean = true // Toggle dataLabel show/hide - Default is TRUE
  @Input() legendOffsetY: number = 50
  @Input() legendOffsetX: number = 20

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: any = {
    series: [],
    labels: [],
    chart: {
      type: "donut",
      width: 0,
      height: 0,
      toolbar: {
        show: false
      }
    },
    // theme: {
    //   mode: "dark",
    //   monochrome: {
    //     enabled: true,
    //     shadeTo: "dark"
    //   }
    // },
    title:  '',
    colors: [],
    plotOptions: {
      pie: {
        // expandOnClick: false,
        // customScale: 0.6,
        // size: 100,
        donut: {
          size: '80%',
          labels: {
            show: false,
            name: {
              show: true,
              style: {
                fontSize: "8",
              },
            },
            value: {
                show: true,
                fontWeight: "bold",
                color: "#000",
                offsetY: 10,
                // formatter: function (val: any) {
                //   return Number(val).toLocaleString()
                // }
            },
            total: {
                show: true,
                showAlways: true,
                color: "#000",
                style: {
                  fontSize: '8',
                },
                formatter: function (opts: any) {
                  const sum = opts.config.series.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0);
                  return '$'+Number(sum).toLocaleString()
                }
            },
            style: {
              fontSize: '8',
            },
          }
        },
      }
    },
    dataLabels: {
      enabled: false,
      style: {
        colors: []
      },
      dropShadow: {
        enabled: false
      }
    },
    legend: {
      show: false,
      position: "right",
      // horizontalAlign: "center",
      // offsetY: 50,
      // offsetX: 20,
      labels: {
        colors: "#000",
        useSeriesColors: false,
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: window.innerWidth
          },
          legend: {
            position: "right",
            // horizontalAlign: "center",
            // offsetY: 50,
            // offsetX: 20,
          },
          plotOptions: {
            pie: {
              // size: 200
              // customScale: 0.6,
              donut: {
                size: '80%',
                labels: {
                  style: {
                    fontSize: '8',
                  },
                }
              }
            }
          }
        }
      }
    ]
  }

  ngOnInit() {
    this.chartOptions.chart.height = this.height
    this.chartOptions.chart.width = this.width
    
    this.chartOptions.series = this.seriesData;
    this.chartOptions.labels = this.chartLabels
    this.chartOptions.colors = this.chartColors

    this.chartOptions.dataLabels.enabled = this.showDataLabels
    this.chartOptions.plotOptions.pie.donut.labels.total.label = this.chartTotalLabel
    this.chartOptions.plotOptions.pie.donut.labels.show = this.showChartTotalLabel
    this.chartOptions.plotOptions.pie.donut.labels.value.fontSize = '8'
    this.chartOptions.plotOptions.pie.donut.labels.total.fontSize = '8'

    this.chartOptions.dataLabels.dropShadow.enabled = false

    // this.chartOptions.legend.offsetY =  50
    // this.chartOptions.legend.offsetX =  20
    
    // this.chartOptions.responsive.offsetY =  this.legendOffsetY
    // this.chartOptions.responsive.offsetX =  this.legendOffsetX

  }

}
