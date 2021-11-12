import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from '../models/device.model';

@Component({
  selector: 'ud-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  isEditing:Boolean = false;
  constructor(private _matDialogRef: MatDialogRef<DeviceDetailsComponent>,
     @Inject(MAT_DIALOG_DATA) public data: Device,) {
       console.log(data);
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
}
