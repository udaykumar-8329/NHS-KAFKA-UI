import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'ud-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  deviceForm:FormGroup;
  constructor(private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private _dialogRef: MatDialogRef<AddDeviceComponent>, private _deviceService: DeviceService) { }

  ngOnInit(): void {
    this.deviceForm = this._formBuilder.group({
      Name: ['', [Validators.required]],
      Ip: ['', [Validators.required]],
      Port:  ['', [Validators.required]],
      Username:  ['', [Validators.required]],
      Password:  ['', [Validators.required]],
      IsEnabled:  [true, [Validators.required]],
      UseNSO:  [false, [Validators.required]]
    });
  }

  onSubmit(){
    console.log(this.deviceForm.value, this.deviceForm.valid);

    if(this.deviceForm.valid){
      // this._dialogRef.close({data: this.deviceForm.value, status: true});
      this._deviceService.addDevice(this.deviceForm.value).subscribe((res)=>{
        console.log(res);
        if(res["InsertedID"]){
          this._dialogRef.close({status: true});
        }else{
          console.log("Something error occured, please check");
        }
      });
    }
  }

  onEdit(){
    console.log(this.deviceForm.value);
    if(this.deviceForm.valid){
      this._dialogRef.close({data: this.deviceForm.value, status: true});
    }
  }

  onClose(){
    this._dialogRef.close();
  }

}
