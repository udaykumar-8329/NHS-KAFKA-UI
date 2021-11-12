import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MacDetail } from '../models/macdetails.model';
import { MacdetailsService } from '../services/macdetails.service';
import { GeoMapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit,AfterViewInit {

  @Input() markersInfo:[]=[];

  constructor(private map: GeoMapService, private macService: MacdetailsService) {
  }

  ngOnInit() {
    // this.map.buildMap();
    // console.log('ngoninit',this.markersInfo);
  }

  ngAfterViewInit(): void {
    this.map.buildMap();
    var centerLat=0,centerLong=0;
    setTimeout(() => {
      this.markersInfo.forEach((element:MacDetail) => {
        console.log(element._id);
        this.map.getGeoCodingFromAddress(element.Area, element.City, element.State, element.Country).subscribe(geoData => {
          console.log(geoData);
          centerLat+=geoData["features"][0]["geometry"]["coordinates"][0]; centerLong+=geoData["features"][0]["geometry"]["coordinates"][1];
          let marker = new mapboxgl.Marker().setLngLat(geoData["features"][0]["center"])
          .setPopup(new mapboxgl.Popup({offset: 20}));
          marker.getElement().addEventListener('click', () => {
            this.getSettings(element);
          });
          marker.addTo(this.map.getMap())
        })

      });
      // this.map.setCenterLatLong(centerLat/this.markersInfo.length,centerLong/this.markersInfo.length);
    }, 5000);
  }
  getSettings(markerDetails:MacDetail){
    console.log('logging marker details'+markerDetails._id);
    this.macService.getDetailsById(markerDetails._id).subscribe(res =>{
      console.log(res);
    })
  }

}
