import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddDeviceComponent } from 'src/app/devices/add-device/add-device.component';

@Component({
  selector: 'ud-add-mac-detail',
  templateUrl: './add-mac-detail.component.html',
  styleUrls: ['./add-mac-detail.component.css']
})
export class AddMacDetailComponent implements OnInit {
  macForm:FormGroup;
  constructor(private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private _dialogRef: MatDialogRef<AddMacDetailComponent>) { }

  ngOnInit(): void {
    this.macForm = this._formBuilder.group({
      macaddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      area:  ['', [Validators.required]],
      country:  ['India', [Validators.required]],
    });
  }

  onSubmit(){
    console.log(this.macForm.value, this.macForm.valid);

    if(this.macForm.valid){
      this._dialogRef.close({data: this.macForm.value, status: true});
    }
  }

  onEdit(){
    console.log(this.macForm.value);
    if(this.macForm.valid){
      this._dialogRef.close({data: this.macForm.value, status: true});
    }
  }

  onClose(){
    this._dialogRef.close();
  }

}
