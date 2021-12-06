import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from '../models/device.model';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'ud-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  isEnabled:Boolean = false;
  isEditing:Boolean = false;
  constructor(private _matDialogRef: MatDialogRef<DeviceDetailsComponent>,
     @Inject(MAT_DIALOG_DATA) public data: Device, private _deviceService: DeviceService) {
       console.log(data);
       this.isEnabled = data['isEnabled']
       if(data["edit"]){
         this.edit()
       }
      }

  ngOnInit(): void {
  }

  closeDialog(){
    this._matDialogRef.close();
  }

  edit(){
    console.log('started editing');
    this.isEditing = !this.isEditing;
  }

  changeStatus(id,status){
    console.log(id, status['checked']);

    this._deviceService.updateDeviceStatus(id, status['checked']).subscribe(res => {
      console.log('update status',res);
      if(res['status']){
        console.log('true status');

        this._matDialogRef.close({status: true})
      }
    })
  }
}
