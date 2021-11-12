import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ListItemComponent } from './list-item/list-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module'; './material/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MyChartsComponent } from './my-charts/my-charts.component';
import { ChartsModule } from 'ng2-charts';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ToastrModule } from 'ngx-toastr';
import { DevicesComponent } from './devices/devices.component';
import { AddDeviceComponent } from './devices/add-device/add-device.component';
import { MacDetailsComponent } from './mac-details/mac-details.component';
import { AddMacDetailComponent } from './mac-details/add-mac-detail/add-mac-detail.component';
import { MapComponent } from './map/map.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { CustomLoaderComponent } from './custom-loader/custom-loader.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListItemComponent,
    DashboardComponent,
    MyChartsComponent,
    SidenavComponent,
    DevicesComponent,
    AddDeviceComponent,
    MacDetailsComponent,
    AddMacDetailComponent,
    MapComponent,
    DeviceDetailsComponent,
    CustomLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    ChartsModule,
    FlexLayoutModule,
    FormsModule, ReactiveFormsModule,
    ToastrModule.forRoot({
      closeButton:true,
      preventDuplicates:true,
      autoDismiss:true,
      progressBar:true,
    }),
    NgHttpLoaderModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
