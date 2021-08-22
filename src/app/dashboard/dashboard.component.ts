import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, ChartType } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { FetchdataService } from '../services/fetchdata.service';
import * as _ from 'lodash';

@Component({
  selector: 'ud-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true
  };

  charts=[];

  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
    backgroundColor: [
      'red', 'yellow', 'rgba(148,159,177,0.2)','red', 'yellow', 'rgba(148,159,177,0.2)','red', 'yellow', 'rgba(148,159,177,0.2)','red', 'yellow', 'rgba(148,159,177,0.2)','red', 'yellow', 'rgba(148,159,177,0.2)','red', 'yellow', 'rgba(148,159,177,0.2)',
    ],
    borderColor: [
      'rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)','rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)','rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)','rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)'
    ]
 }];




  constructor(private _fetchService: FetchdataService) {
    monkeyPatchChartJsLegend();
    monkeyPatchChartJsTooltip();
  }

  ngOnInit(): void {
    this._fetchService.fetchAllInfo().subscribe(res => {
      const counts = {};
      res.forEach((x) => {
        counts[x.IPAddress] = (counts[x.IPAddress] || 0) + 1;
      });
      var d = JSON.stringify(counts);
      d = JSON.parse(d);
      let map = new Map();
      Object.keys(d).forEach(key => {
          map.set(key, d[key]);
      });
      this.pieChartLabels = [...map.keys()];
      this.pieChartData = [...map.values()];
    });


  }

  public randomColor() {
    let randomize = Math.floor(Math.random() * 16777215).toString(16);
    return randomize;
  }
}
