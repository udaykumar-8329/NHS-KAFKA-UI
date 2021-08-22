import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'ud-my-charts',
  templateUrl: './my-charts.component.html',
  styleUrls: ['./my-charts.component.css']
})
export class MyChartsComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Download Sales'], ['In Store Sales'], 'Mail Sales'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor() {
    monkeyPatchChartJsLegend();
    monkeyPatchChartJsTooltip();
   }

  ngOnInit(): void {

  }


}
