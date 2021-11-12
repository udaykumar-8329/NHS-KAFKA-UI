import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
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

  getAllDevices(){
    return this._http.get(this.apiUrl+"/fetch/devices/all");
  }

  addDevice(device:Device){
    return this._http.post(this.apiUrl+'/devices/add',  device);
  }

  getDetailsById(_id){
    return this._http.get(this.apiUrl+'/fetch/devices/'+_id);
  }
}
