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
  @Input() device:string='';

  constructor(private _formBuilder: FormBuilder, private _mapService: GeoMapService,
    @Inject(MAT_DIALOG_DATA) public data: Device,
    private _dialogRef: MatDialogRef<AddDeviceComponent>, private _deviceService: DeviceService) {
    }

    ngOnInit(): void {
      if (this.device === '') {
        console.log('in if',this.device);

        this.deviceForm = this._formBuilder.group({
          Name: ['', [Validators.required]],
          Ip: ['', [Validators.required]],
          Port: ['', [Validators.required]],
          Username: ['', [Validators.required]],
          Password: ['', [Validators.required]],
          IsEnabled: [true, [Validators.required]],
          UseNSO: [false, [Validators.required]]
        });
        this.macForm = this._formBuilder.group({
          Macaddress: ['', [Validators.required]],
          City: ['', [Validators.required]],
          Area: ['', [Validators.required]],
          State: ['', [Validators.required]],
          Country: ['India', [Validators.required]],
        });
      } else {
        console.log('in else',this.device);
        // this.deviceForm = this._formBuilder.group({
        //   Name: [this.devices.Name, [Validators.required]],
        //   Ip: [this.devices.Ip, [Validators.required]],
        //   Port: [this.devices.Port, [Validators.required]],
        //   Username: [this.devices.Username, [Validators.required]],
        //   Password: [this.devices.Password, [Validators.required]],
        //   IsEnabled: [this.devices.IsEnabled, [Validators.required]],
        //   UseNSO: [this.devices.UseNSO, [Validators.required]]
        // });
        // this.macForm = this._formBuilder.group({
        //   Macaddress: [this.devices.macDetails.Macaddress, [Validators.required]],
        //   City: [this.devices.macDetails.City, [Validators.required]],
        //   Area: [this.devices.macDetails.Area, [Validators.required]],
        //   State: [this.devices.macDetails.State, [Validators.required]],
        //   Country: [this.devices.macDetails.Country, [Validators.required]],
        // });
      }
    }

  async onSubmit() {
    console.log(this.deviceForm.value, this.deviceForm.valid);

    if (this.deviceForm.valid && this.macForm.valid) {
      // this._dialogRef.close({data: this.deviceForm.value, status: true});
      let deviceDetails: Device;
      deviceDetails = this.deviceForm.value;
      deviceDetails.macDetails = this.macForm.value;

      await this._mapService.getGeoCodingFromAddress(deviceDetails.macDetails.Area, deviceDetails.macDetails.City, deviceDetails.macDetails.State, deviceDetails.macDetails.Country).subscribe(res => {
        console.log(res);

        let coordinates: Coordinates = new Coordinates();
        coordinates.latitude = res["features"][0]["center"][0];
        coordinates.longitude = res["features"][0]["center"][1];
        deviceDetails.coordinates = coordinates;
        this._deviceService.addDevice(deviceDetails).subscribe((res) => {
          console.log(res);
          if (res["InsertedID"]) {
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

  onEdit() {
    console.log(this.deviceForm.value);
    if (this.deviceForm.valid) {
      this._dialogRef.close({ data: this.deviceForm.value, status: true });
    }
  }

  onClose() {
    this._dialogRef.close();
  }

}
