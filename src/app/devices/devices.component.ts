import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Device } from '../models/device.model';
import { AddDeviceComponent } from './add-device/add-device.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DeviceService } from '../services/device.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DeviceDetailsComponent } from '../device-details/device-details.component';


const DATA = [{ name: 'fas', ip: 'dsfasdfa', port: '1213', username: 'fdasf', password: 'dfasf', isEnabled: false, useNSO: true },
{ name: 'fafass', ip: '103.249.77.21', port: '1213', username: 'fdasf', password: 'dfasf', isEnabled: true, useNSO: true },
{ name: 'fasfsdf', ip: '103.249.77.22', port: '1213', username: 'fdasf', password: 'dfasf', isEnabled: false, useNSO: false },
{ name: 'dfas', ip: '103.249.78.21', port: '1213', username: 'fdasf', password: 'dfasf', isEnabled: true, useNSO: false }
  , { name: 'dsfas', ip: '103.249.77.11', port: '1213', username: 'fdasf', password: 'dfasf', isEnabled: false, useNSO: true }
  , { name: 'fda', ip: '103.249.778.24', port: '1213', username: 'fdasf', password: 'dfasf', isEnabled: true, useNSO: false },
  { name: 'fas', ip: 'dsfasdfa', port: '1213', username: 'fdasf', password: 'dfasf', isEnabled: false, useNSO: true },
  { name: 'fafass', ip: '103.249.77.21', port: '1213', username: 'fdasf', password: 'dfasf', isEnabled: true, useNSO: true },
  { name: 'fasfsdf', ip: '103.249.77.22', port: '1213', username: 'fdasf', password: 'dfasf', isEnabled: false, useNSO: false },
  { name: 'dfas', ip: '103.249.78.21', port: '1213', username: 'fdasf', password: 'dfasf', isEnabled: true, useNSO: false }
    , { name: 'dsfas', ip: '103.249.77.11', port: '1213', username: 'fdasf', password: 'dfasf', isEnabled: false, useNSO: true }
    , { name: 'fda', ip: '103.249.778.24', port: '1213', username: 'fdasf', password: 'dfasf', isEnabled: true, useNSO: false },
    { name: 'fas', ip: 'dsfasdfa', port: '1213', username: 'fdasf', password: 'dfasf', isEnabled: false, useNSO: true },
    { name: 'fafass', ip: '103.249.77.21', port: '1213', username: 'fdasf', password: 'dfasf', isEnabled: true, useNSO: true },
    { name: 'fasfsdf', ip: '103.249.77.22', port: '1213', username: 'fdasf', password: 'dfasf', isEnabled: false, useNSO: false },
    { name: 'dfas', ip: '103.249.78.21', port: '1213', username: 'fdasf', password: 'dfasf', isEnabled: true, useNSO: false }
      , { name: 'dsfas', ip: '103.249.77.11', port: '1213', username: 'fdasf', password: 'dfasf', isEnabled: false, useNSO: true }
      , { name: 'fda', ip: '103.249.778.24', port: '1213', username: 'fdasf', password: 'dfasf', isEnabled: true, useNSO: false },]

@Component({
  selector: 'ud-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements AfterViewInit {

  devices: Device[];
  displayedColumns: string[] = ['name', 'ip', 'port', 'area', 'city', 'state', 'country', 'isEnabled', 'useNSO','edit','delete'];
  dataSource;
  geocodedData;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _matDialog: MatDialog, private _liveAnnouncer: LiveAnnouncer,
    private _bottomSheet: MatBottomSheet, private _snackBar:MatSnackBar,
     private changeDetectorRefs: ChangeDetectorRef, private _deviceService: DeviceService) {
    this.getDevices();
   }

  ngOnInit(): void {
    // this.devices = DATA;
  }

  ngAfterViewInit() {

  }

  getDevices(){
    this._deviceService.getAllDevices().subscribe((res:Device[]) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.geocodedData = res;
    });
    console.log(this.dataSource);
  }

  addNewDevice() {
    let dialogRef = this._matDialog.open(AddDeviceComponent, {
      width: '60%'
    });

    dialogRef.afterClosed().subscribe((res)=>{
      console.log(res);
      if(res["status"]){
        this.getDevices();
      }
    })
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  deleteDeviceById(id){
    let sheetRef = this._bottomSheet.open(DialogContentComponent);
    sheetRef.disableClose = true;
    sheetRef.afterDismissed().subscribe(res => {
      if(res){
        this._deviceService.deleteDeviceById(id).subscribe(res=>{
          console.log(res);
        })
      }else{
        this._snackBar.open('Deletion Cancelled', 'Close', {
          duration: 600
        })
      }
    })
  }

  openEditPage(deviceId){
    this._deviceService.getDetailsById(deviceId).subscribe((dev:Device) =>{
      dev["edit"] = true;
      let dialogRef = this._matDialog.open(DeviceDetailsComponent,{
        hasBackdrop: true,
        disableClose: true,
        panelClass: "sample",
        width:"25vw",
        height:"100vh",
        position: {
          right:'0',
          top: '65px'
        },
        data: dev,
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result['status']){
          // this.getDevices();
          console.log(result);

          window.location.reload();
        }
      })
    });
  }
}
