import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Device } from '../models/device.model';
import { DeviceService } from '../services/device.service';
import { NetConfService } from '../services/netconf.service';

@Component({
  selector: 'ud-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  isEnabled:Boolean = false;
  isEditing:Boolean = false;
  devConfig='Fetching...';
  devCapabilities='Fetching...';
  constructor(private _matDialogRef: MatDialogRef<DeviceDetailsComponent>, private _toastrService: ToastrService,
     @Inject(MAT_DIALOG_DATA) public data: Device, private _deviceService: DeviceService, private _netConfService: NetConfService) {
       console.log(data);
       this.isEnabled = data['isEnabled']
       if(data["edit"]){
         this.edit()
       }
       this.getConfig()
       this.getCapabilities()
      }

  ngOnInit(): void {
  }

  closeDialog(){
    this._matDialogRef.close();
  }

  getConfig(){
    this._netConfService.getNetConfConfig().subscribe(res => {
      if(res['config']){
        this.devConfig=res['config']
      }else{
        this._toastrService.error("Couldn't connect to the server for fetching config", "Net Conf")
      }
      // console.log(res['config']);
    })
  }

  getCapabilities(){
    this._netConfService.getNetConfCapabilities().subscribe(res => {
      // console.log(typeof(res['capabilities']));
      if(res['capabilities']){
        this.devCapabilities=res['capabilities']
      }else{
        this._toastrService.error("Couldn't connect to the server for fetching capabilities", "Net Conf")
      }
    })
  }

  edit(){
    console.log('started editing');
    this.isEditing = !this.isEditing;
  }

  changeStatus(id,status){
    console.log(id, status['checked']);

    this._netConfService.getNetConfRPCStatus(this.data['ipaddress'], status['checked']).subscribe(res => {
      console.log(res);
    })

    // this._deviceService.updateDeviceStatus(id, status['checked']).subscribe(res => {
    //   console.log('update status',res);
    //   if(res['status']){
    //     console.log('true status');
    //     this._matDialogRef.close({status: true})
    //   }
    // })
  }
}
