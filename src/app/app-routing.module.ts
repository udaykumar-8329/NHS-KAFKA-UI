import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddDeviceComponent } from './devices/add-device/add-device.component';
import { DevicesComponent } from './devices/devices.component';
import { MacDetailsComponent } from './mac-details/mac-details.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path:'Home',component: DashboardComponent
  },
  {
    path:'Fetch',component:SearchComponent
  },
  {
    path:'', component: SearchComponent
  },
  {path: 'devices', component: DevicesComponent},{
    path: 'macdetails', component: MacDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
