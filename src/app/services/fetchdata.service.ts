import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { IPInfo } from '../models/ipinfo.model';

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

  fetchDataForIP(ipaddress,portid){
    return this._http.get<IPInfo[]>("http://localhost:8088/fetch/ip/"+ipaddress);
  }

  fetchAllInfo(){
    return this._http.get<IPInfo[]>("http://localhost:8088/fetch/all");
  }

}
