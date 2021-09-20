import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SearchForm } from '../models/Search.model';
import { FetchdataService } from '../services/fetchdata.service';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as IPinfo from "../models/ipinfo.model";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  cpuData:IPinfo.CPUTelemetryData[]=[];
  gcData:IPinfo.GenericCountersTelemetryData[]=[];
  data;
  needTabReload:boolean;
  // worker;
  constructor(private _fetchService:FetchdataService,
    private _formBuilder:FormBuilder, private _toastrService:ToastrService) { }

  ngOnInit(): void {

  }

  searchFormData = this._formBuilder.group({
    ipAddress: ['',[Validators.required]],
    port: ['', [Validators.required,Validators.min(1),Validators.max(35555)]],
  });


  async onSubmit(ipaddress,portaddress){
    var formData = new SearchForm(ipaddress,portaddress);
    console.log(formData);
    this.gcData=[];
    this.cpuData=[];
    this.data = this.searchFormData.value;
    this.getGCData();
    this.getCPUData();
  }

  async getCPUData(){
    this.needTabReload=false;
    await this._fetchService.fetchAllCPUInfo(this.data).subscribe( (res:[]) => {
      if(res){
        if(res!==this.cpuData)
          {
            this.cpuData=res;
            this._toastrService.success("Data Changed","Loading Data")
          }
        else {
          this._toastrService.warning("No change in Data", "No change in Data")
        }
        // console.log(this.cpuData);
      }
      else{
        this._toastrService.error('No Data found', "Un Successfull");
      }
    });
  }

  async getGCData(){
    this.needTabReload=false;
    await this._fetchService.fetchAllGCInfo(this.data).subscribe( (res:[]) => {
      if(res){
        if(res!==this.gcData){
          this.gcData=res;
          this._toastrService.success("Data Changed","Loading Data")
        }
        else {
          this._toastrService.warning("No change in Data", "No change in Data")
        }
      }
      else{
        this._toastrService.error('No Data found', "Un Successfull");
      }
    });
  }

  showNoChange(){
    console.log('hello');

  }
}
