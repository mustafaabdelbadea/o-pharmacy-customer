import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { GetAllPharmaciesService } from '../services/get-all-pharmacies.service';

@Component({
  selector: 'app-get-all-pharmacies',
  templateUrl: './get-all-pharmacies.component.html',
  styleUrls: ['./get-all-pharmacies.component.scss']
})
export class GetAllPharmaciesComponent implements OnInit {
  //search text for pipe seach
  searchText: any = null;
  allPharmaciesData: any;
  constructor(_GetAllPharmaciesService: GetAllPharmaciesService, private elementRef: ElementRef, public router: Router) {
    _GetAllPharmaciesService.allPharmacies().subscribe((data) => {
      this.allPharmaciesData = data;
      console.log('data', this.allPharmaciesData)
      this.map()
    },
      err => {
        console.log(err);
      })
  }
  lng: any;
  latt: any;
  map() {
    // TO MAKE THE MAP APPEAR YOU MUST
    // ADD YOUR ACCESS TOKEN FROM
    // https://account.mapbox.com
    const accessToken = 'pk.eyJ1IjoibXVzdGFmYWFiZGVsYmFkZWEiLCJhIjoiY2tpbHcwNmg2MG0wNjJ2cDlxbXI2NGZxbSJ9.h5Kephiwr11YMCfLXs14FQ';
    var geojson = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': '',
          'properties': {
            'message': '',
            'iconSize': [0, 0],
            'id': null
          },
          'geometry': {
            'type': 'Point',
            //it must be our location
            'coordinates': [30.013056, 31.208853]
          }
        }
      ]
    };
    //get all pharmacies 
    for (var i = 0; i < this.allPharmaciesData.length; i++) {
      geojson.features.push({
        'type': 'Feature',
        'properties': {
          'message': this.allPharmaciesData[i].name,
          'iconSize': [40, 40],
          'id': this.allPharmaciesData[i]._id
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [this.allPharmaciesData[i].locationAsCoordinates.coordinates.lon, this.allPharmaciesData[i].locationAsCoordinates.coordinates.lat]
        }
      })

    }

    console.log(geojson)
    var map = new mapboxgl.Map({
      accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      //map center
      center: [31.23245222369428, 30.0492005278656],
      zoom: 7
    });

    geojson.features.forEach(function (marker) {
      // create a DOM element for the marker
      var el = document.createElement('div');
      el.className = 'marker';
     // el.innerHTML='<img src="../../assets/images/getAllPharmacies/6686e7a77f36f814819125b0d81b9ffa.png" title="this will be displayed as a tooltip" class="rounded-circle" style="width:40px;height:40px;">'
      //add photo to map to every pharmacy
      el.style.backgroundImage =
        'url(../../assets/images/getAllPharmacies/6686e7a77f36f814819125b0d81b9ffa.png)';
        el.title=marker.properties.message;
      //image size
      el.style.width = marker.properties.iconSize[0] + 'px';
      el.style.height = marker.properties.iconSize[1] + 'px';
      el.style.backgroundRepeat = 'no-repeat';
      el.style.backgroundSize = 'cover';
      el.style.borderRadius = '50%';
      el.addEventListener('click', function () {
        //navigate to pharmacy page using js 
        window.location.href = '/GetOnePharmacy/' + marker.properties.id;
      });
      // add marker to map
      new mapboxgl.Marker(el)
        //coordinates[0] to get lat , coordinates[1] to get lon
        .setLngLat([marker.geometry.coordinates[0], marker.geometry.coordinates[1]])
        .addTo(map);
    });
    //to get coord when click on button
    var geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: false
      },
      trackUserLocation: true
    });
    map.addControl(geolocate);
    geolocate.on('geolocate', (e: any) => {
      this.lng = e.coords.longitude;
      this.latt = e.coords.latitude
      var position = [this.lng, this.latt];
      console.log(position)
      return position;

    });
  }
  ngOnInit(): void {

  }
  //to add backgound (color || image ) to only this page
  ngAfterViewInit() {
    // this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#e2e6ea';
    // this.elementRef.nativeElement.ownerDocument.body.style.backgroundSize = "cover";
  }

}
