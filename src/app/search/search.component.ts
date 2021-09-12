import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  cpuData:IPinfo.CPUTelemetryData[]=[];
  gcData:IPinfo.GenericCountersTelemetryData[]=[];

  // worker;
  constructor(private _fetchService:FetchdataService,
    private _formBuilder:FormBuilder, private _toastrService:ToastrService) { }

  ngOnInit(): void {

  }

  searchFormData = this._formBuilder.group({
    ipAddress: ['',[Validators.required]],
    port: ['', [Validators.required,Validators.min(1),Validators.max(35555)]],
  });


  onSubmit(ipaddress,portaddress){
    var formData = new SearchForm(ipaddress,portaddress);
    console.log(formData);
    this.gcData=[];
    this.cpuData=[];
    var data = this.searchFormData.value;
    this._fetchService.fetchAllCPUInfo(data).subscribe((res:[]) => {
      if(res){
       this.cpuData=res;
       console.log(this.cpuData);
      }
      else{
        this._toastrService.error('No Data found', "Un Successfull");
      }
    });

    this._fetchService.fetchAllGCInfo(data).subscribe((res:[]) => {
      if(res){
        this.gcData=res;
        console.log(this.gcData);
      }
      else{
        this._toastrService.error('No Data found', "Un Successfull");
      }
    });
  }
}
