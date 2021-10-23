import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ud-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  deviceForm:FormGroup;
  constructor(private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private _dialogRef: MatDialogRef<AddDeviceComponent>) { }

  ngOnInit(): void {
    this.deviceForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      ip: ['', [Validators.required]],
      port:  ['', [Validators.required]],
      username:  ['', [Validators.required]],
      password:  ['', [Validators.required]],
      isEnabled:  [true, [Validators.required]],
      useNSO:  [false, [Validators.required]]
    });
  }

  onSubmit(){
    console.log(this.deviceForm.value, this.deviceForm.valid);

    if(this.deviceForm.valid){
      this._dialogRef.close({data: this.deviceForm.value, status: true});
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
