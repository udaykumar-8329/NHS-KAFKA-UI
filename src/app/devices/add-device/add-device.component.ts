import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Coordinates } from 'src/app/models/coordinates.model';
import { Device } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/device.service';
import { GeoMapService } from 'src/app/services/map.service';

@Component({
  selector: 'ud-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  deviceForm: FormGroup;
  macForm: FormGroup;
  @Input() showCloseButton: Boolean = true;
  @Input() isLinear: Boolean = true;
  @Input() device:Device;
  @Input() orientation:string='horizontal';

  constructor(private _formBuilder: FormBuilder, private _mapService: GeoMapService,
    @Inject(MAT_DIALOG_DATA) public data: Device,
    private _dialogRef: MatDialogRef<AddDeviceComponent>, private _deviceService: DeviceService) {
    }

    ngOnInit(): void {
      console.log(this.device);
      if (!this.device) {
        console.log('in if',this.device);

        this.deviceForm = this._formBuilder.group({
          name: ['', [Validators.required]],
          ipaddress: ['', [Validators.required]],
          port: ['', [Validators.required]],
          username: ['', [Validators.required]],
          password: ['', [Validators.required]],
          isEnabled: [true, [Validators.required]],
          useNSO: [false, [Validators.required]]
        });
        this.macForm = this._formBuilder.group({
          macAddress: ['', [Validators.required]],
          city: ['', [Validators.required]],
          area: ['', [Validators.required]],
          state: ['', [Validators.required]],
          country: ['India', [Validators.required]],
        });
      } else {
        console.log('in else',this.device);

        this.deviceForm = this._formBuilder.group({
          name: [this.device['name'], [Validators.required]],
          ipaddress: [this.device['ipaddress'], [Validators.required]],
          port: [this.device['port'], [Validators.required]],
          username: [this.device['username'], [Validators.required]],
          password: [this.device['password'], [Validators.required]],
          isEnabled: [this.device['isEnabled'], [Validators.required]],
          useNSO: [this.device['useNSO'], [Validators.required]]
        });
        this.macForm = this._formBuilder.group({
          macAddress: [this.device['macDetails']['macAddress'], [Validators.required]],
          city: [this.device['macDetails']['city'], [Validators.required]],
          area: [this.device['macDetails']['area'], [Validators.required]],
          state: [this.device['macDetails']['state'], [Validators.required]],
          country: [this.device['macDetails']['country'], [Validators.required]],
        });

      }
    }
    ngOnChanges(changes){
      console.log(changes);
    }

  async onSubmit() {
    console.log(this.deviceForm.value, this.macForm.valid);

    if (this.deviceForm.valid && this.macForm.valid) {
      // this._dialogRef.close({data: this.deviceForm.value, status: true});
      let deviceDetails: Device;
      deviceDetails = this.deviceForm.value;
      deviceDetails.macDetails = this.macForm.value;

      await this._mapService.getGeoCodingFromAddress(deviceDetails.macDetails.area, deviceDetails.macDetails.city, deviceDetails.macDetails.state, deviceDetails.macDetails.city).subscribe(res => {
        console.log(res);

        let coordinates: Coordinates = new Coordinates();
        coordinates.latitude = res["features"][0]["center"][0];
        coordinates.longitude = res["features"][0]["center"][1];
        deviceDetails.coordinates = coordinates;
        this._deviceService.addDevice(deviceDetails).subscribe((res) => {
          console.log(res);
          if (res["status"]) {
            this._dialogRef.close({ status: true });
          } else {
            console.log("Something error occured, please check");
          }
        });

      });


    } else {
      console.log("errors", this.deviceForm.errors, this.macForm.errors);
      console.log("valid", this.deviceForm.valid, this.macForm.valid);
    }
  }

  onEdit(id) {
    console.log(this.deviceForm.value);
    if (this.deviceForm.valid&&this.macForm.valid) {
      var device:Device;
      device = this.deviceForm.value;
      console.log(this.getDirtyValues([this.deviceForm,this.macForm]));

      this._deviceService.updateDeviceById(id, this.getDirtyValues([this.deviceForm,this.macForm])).subscribe(res => {
        console.log(res);
      });
    }
  }

  getDirtyValues(forms: any[]) {
    let dirtyValues = {};
    forms.forEach(form => {
        Object.keys(form.controls)
            .forEach(key => {
                const currentControl = form.controls[key];

                if (currentControl.dirty) {
                    if (currentControl.controls)
                        dirtyValues[key] = this.getDirtyValues(currentControl);
                    else
                        dirtyValues[key] = currentControl.value;
                }
            });
    });

    return dirtyValues;
}

  onClose() {
    this._dialogRef.close();
  }

}
