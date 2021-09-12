import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FetchdataService {

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
      return this._http.get("http://localhost:8088/fetch/gc/all/"+inputData["ipAddress"]+"/"+inputData["port"]);
    }
    else{
      return this._http.get("http://localhost:8088/fetch/gc/all");
    }
  }

  fetchAllCPUInfo(inputData?:any){
    console.log(inputData);

    if(typeof inputData == undefined){
      return this._http.get("http://localhost:8088/fetch/cpu/all/"+inputData["ipAddress"]+"/"+inputData["port"]);
    }
    else{
      return this._http.get("http://localhost:8088/fetch/cpu/all");
    }
  }
}
