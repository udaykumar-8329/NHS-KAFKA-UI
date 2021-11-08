import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoMapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit,AfterViewInit {

  @Input() markersInfo:[]=[];

  constructor(private map: GeoMapService) {
  }

  ngOnInit() {
    // this.map.buildMap();
    // console.log('ngoninit',this.markersInfo);
  }

  ngAfterViewInit(): void {
    this.map.buildMap();
    var centerLat=0,centerLong=0;
    setTimeout(() => {
      this.markersInfo.forEach(element => {
        centerLat+=element[0]; centerLong+=element[1];
        let marker = new mapboxgl.Marker().setLngLat(element)
            .setPopup(new mapboxgl.Popup({offset: 20})
            .setHTML(`<div>
            <h1>Feature yet to be developed</h1>
        </div>`))
        marker.addTo(this.map.getMap())
      });
      this.map.setCenterLatLong(centerLat/this.markersInfo.length,centerLong/this.markersInfo.length);

    }, 5000);
  }


}
