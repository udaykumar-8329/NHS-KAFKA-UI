import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IPInfo } from '../models/ipinfo.model';
import { SearchForm } from '../models/Search.model';
import { FetchdataService } from '../services/fetchdata.service';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  data:IPInfo[]=[];
  constructor(private _fetchService:FetchdataService, private _formBuilder:FormBuilder) { }

  ngOnInit(): void {

  }

  searchFormData = this._formBuilder.group({
    ipAddress: ['',[Validators.required]],
    port: [4200, [Validators.required,Validators.min(1),Validators.max(35555)]],
  });


  onSubmit(ipaddress,portaddress){
    var formData = new SearchForm(ipaddress,portaddress);
    console.log(formData);
    this.data=[];
    this._fetchService.fetchDataForIP(ipaddress,portaddress).subscribe((res) => {
      if(res.length != 0){
        this.data = res;
      }
    });

    setInterval(()=>{
      this._fetchService.fetchDataForIP(ipaddress,portaddress).subscribe((res) => {
        if(res.length != 0){
          this.data = res;
        }
      });
    }, 60000)
  }
}
