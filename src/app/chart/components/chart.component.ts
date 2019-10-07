import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChartDataService} from '../services/chart-data.service';
import {Chart, ChartOptions} from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import {ChartDataModel, ChartPointModel} from '../../models/models';

@Component({
  selector: 'app-chart',
  templateUrl: 'chart.component.html'
})
export class ChartComponent implements OnInit {
  static chartComponent: ChartComponent;
  chart: any;
  labelList: Array<string>;
  dateSet1List: Array<Array<ChartPointModel>>;

  @ViewChild('lineChart') chartRef: ElementRef;

  constructor(private chartDataService: ChartDataService) {
    const self = this;
    ChartComponent.chartComponent = self;
    self.labelList = [];
    self.dateSet1List = [];

    self.chartDataService.getAllDate().subscribe(date => {
      self.parseDateSet(date);
      self.createChart();
    });

  }

  ngOnInit() {
    const namedChartAnnotation = ChartAnnotation;
    namedChartAnnotation['id'] = 'annotation';
    Chart.pluginService.register(namedChartAnnotation);
  }

  createChart() {
    const self = ChartComponent.chartComponent;
    self.chart = new Chart(self.chartRef.nativeElement, {
      type: 'line',
      plugins: [ChartAnnotation],
      data: {
        labels: self.labelList,
        datasets: [
          {
            data: self.dateSet1List[1],
            borderColor: '#ff96ec',
            backgroundColor: 'rgba(249,135,220,0.32)',
            fill: true
          },
          {
            data: self.dateSet1List[2],
            borderColor: '#6886ff',
            backgroundColor: 'rgba(104,134,255,0.32)',
            fill: true
          }
        ]
      },
      options: {
        tooltips: {
          mode: 'index',
          intersect: false
        },
        legend: {
          display: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              displayFormats: {
                quarter: 'dd.MM.yy(HH:mm)'
              }
            },
            display: true
          }],
          yAxes: [{
            display: true
          }],
        },
        annotation: {
          annotations: [{
            type: 'line',
            id: 'h1Line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: 250,
            borderWidth: 2.5,
            borderColor: '#ff96ec',
            borderDash: [10, 2]
          }, {
              type: 'line',
              id: 'h2Line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: 500,
              borderWidth: 2.5,
              borderColor: '#6886ff',
              borderDash: [10, 2]
            }]
        }
      } as ChartOptions
    });
  }

  parseDateSet(data: ChartDataModel) {
    const self = ChartComponent.chartComponent;
    data.results.map(result => {
      const numbers = result.measurements.map(measurement => measurement.value);
      if (numbers.length === 6) {
        const chartPointModels = self.createDateSet(numbers);
        self.dateSet1List.push(chartPointModels);
      }
    });
    if (self.dateSet1List.length > 0) {
      self.labelList = self.createLabelsSet(self.dateSet1List[0]);
    }
  }

  createDateSet(values: number[]): Array<ChartPointModel> {
    return values.map((value, index) => {
      const chartPointModel = {} as ChartPointModel;
      const date = new Date();
      date.setHours(index + 1);
      chartPointModel.x = date;
      chartPointModel.y = values[index];
      return chartPointModel;
    });
  }

  createLabelsSet(charPointArras: Array<ChartPointModel>): Array<string> {
    return charPointArras.map(charPoint => charPoint.x.toISOString());
  }
}
