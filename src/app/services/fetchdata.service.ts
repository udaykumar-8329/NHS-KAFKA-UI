import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FetchdataService {

  apiUrl= environment.apiBaseUrl;
  constructor(private _http:HttpClient) { }
  options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  }

  fetchAllGCInfo(inputData?){
    if(typeof inputData == undefined){
      return this._http.get(this.apiUrl+"/cpugc/fetch/gc/all/"+inputData["ipAddress"]+"/"+inputData["port"]);
    }
    else{
      return this._http.get(this.apiUrl+"/cpugc/fetch/gc/all");
    }
  }

  fetchAllCPUInfo(inputData?){
    console.log(inputData);

    if(typeof inputData == undefined){
      return this._http.get(this.apiUrl+"/cpugc/fetch/cpu/all/"+inputData["ipAddress"]+"/"+inputData["port"]);
    }
    else{
      return this._http.get(this.apiUrl+"/cpugc/fetch/cpu/all");
    }
  }
}
