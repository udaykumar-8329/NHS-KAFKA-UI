import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddDeviceComponent } from '../devices/add-device/add-device.component';
import { MacDetail } from '../models/macdetails.model';
import { MacdetailsService } from '../services/macdetails.service';
import { GeoMapService } from '../services/map.service';
import { AddMacDetailComponent } from './add-mac-detail/add-mac-detail.component';

@Component({
  selector: 'ud-mac-details',
  templateUrl: './mac-details.component.html',
  styleUrls: ['./mac-details.component.css']
})
export class MacDetailsComponent implements OnInit {
// @ViewChild(MatSort) sort: MatSort;
macDetials: MacDetail[];
displayedColumns: string[] = ['macaddress', 'area', 'city','state', 'country','edit','delete'];
dataSource;// = new MatTableDataSource(DATA);
geocodedData=[];

@ViewChild(MatPaginator) paginator: MatPaginator;
constructor(private _matDialog: MatDialog, private _mapService: GeoMapService , private _macDetailService: MacdetailsService, private _liveAnnouncer: LiveAnnouncer, private changeDetectorRefs: ChangeDetectorRef) { }


ngOnInit(): void {
  // this.macDetials = DATA;
  this.getMacDetails();
 }

ngAfterViewInit() {
}

getMacDetails(){
  this._macDetailService.getAllMacDetails().subscribe((res:MacDetail[])=>{
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;

    res.forEach(element => {
      this._mapService.getGeoCodingFromAddress(element.Area, element.City, element.State, element.Country)
        .subscribe(geoData =>{
          this.geocodedData.push(geoData["features"][0]["geometry"]["coordinates"]);
      })
    });
  })
}
addNewDevice() {
  let dialogRef = this._matDialog.open(AddMacDetailComponent, {
    width: '60%'
  });
  dialogRef.afterClosed().subscribe((res)=>{
    console.log(res);
    if(res["status"]){
      this.getMacDetails();
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
