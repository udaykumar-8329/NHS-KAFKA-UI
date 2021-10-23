import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddDeviceComponent } from '../devices/add-device/add-device.component';
import { MacDetail } from '../models/macdetails.model';
import { AddMacDetailComponent } from './add-mac-detail/add-mac-detail.component';

const DATA: MacDetail[] =[{macaddress: 'fasdffasdfs',area:'fasdfa', city: 'sdfasdf', country: 'sfasdfa'},
{macaddress: 'fasdffasdfs',area:'fasdfa', city: 'sdfasdf', country: 'sfasdfa'},
{macaddress: 'fasdffasdfs',area:'fasdfa', city: 'sdfasdf', country: 'sfasdfa'},
{macaddress: 'fasdffasdfs',area:'fasdfa', city: 'sdfasdf', country: 'sfasdfa'},
{macaddress: 'fasdffasdfs',area:'fasdfa', city: 'sdfasdf', country: 'sfasdfa'},
{macaddress: 'fasdffasdfs',area:'fasdfa', city: 'sdfasdf', country: 'sfasdfa'},
{macaddress: 'fasdffasdfs',area:'fasdfa', city: 'sdfasdf', country: 'sfasdfa'},
{macaddress: 'fasdffasdfs',area:'fasdfa', city: 'sdfasdf', country: 'sfasdfa'},
{macaddress: 'fasdffasdfs',area:'fasdfa', city: 'sdfasdf', country: 'sfasdfa'},
{macaddress: 'fasdffasdfs',area:'fasdfa', city: 'sdfasdf', country: 'sfasdfa'},
{macaddress: 'fasdffasdfs',area:'fasdfa', city: 'sdfasdf', country: 'sfasdfa'},
{macaddress: 'fasdffasdfs',area:'fasdfa', city: 'sdfasdf', country: 'sfasdfa'},]

@Component({
  selector: 'ud-mac-details',
  templateUrl: './mac-details.component.html',
  styleUrls: ['./mac-details.component.css']
})
export class MacDetailsComponent implements OnInit {
// @ViewChild(MatSort) sort: MatSort;
macDetials: MacDetail[];
displayedColumns: string[] = ['macaddress', 'area', 'city', 'country','edit','delete'];
dataSource = new MatTableDataSource(DATA);

@ViewChild(MatPaginator) paginator: MatPaginator;
constructor(private _matDialog: MatDialog, private _liveAnnouncer: LiveAnnouncer, private changeDetectorRefs: ChangeDetectorRef) { }


ngOnInit(): void {
  this.macDetials = DATA;
 }

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;

}

addNewDevice() {
  let dialogRef = this._matDialog.open(AddMacDetailComponent, {
    width: '60%'
  });
  dialogRef.afterClosed().subscribe((res)=>{
    console.log(res);

    if(res["status"]){
      this.dataSource.data.push(res["data"]);
      console.log("added");
      this.changeDetectorRefs.detectChanges();
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
