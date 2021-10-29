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

  // @ViewChild(MatSort) sort: MatSort;
  devices: Device[];
  displayedColumns: string[] = ['name', 'ip', 'port', 'username', 'password', 'isEnabled', 'useNSO','edit','delete'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _matDialog: MatDialog, private _liveAnnouncer: LiveAnnouncer, private changeDetectorRefs: ChangeDetectorRef, private _deviceService: DeviceService) {
    this.getDevices();
   }


  ngOnInit(): void {
    // this.devices = DATA;

   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  getDevices(){
    this._deviceService.getAllDevices().subscribe((res:Device[]) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
    });
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

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
