import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {MapService} from '../services/mapservice/map.service';
import {UserService} from '../services/userservice/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/user';

declare var google;


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  userData: User;
  id;
  // tslint:disable-next-line:max-line-length
  constructor(private geolocation: Geolocation, private mapService: MapService, private userService: UserService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.mapService.getUserData(this.id)
        .then((promData) => {this.userData = promData; this.getMarkers(); console.log(promData); } )
        .catch(err => console.log(err));
    console.log(this.userData);
    this.displayGoogleMap();

  }


  displayGoogleMap() {
    const latLng = new google.maps.LatLng(28.6117993, 77.2194934);

    const mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }

  getMarkers() {
    const position = new google.maps.LatLng(this.userData.address.geo.lat, this.userData.address.geo.lng);

    const userMarker = new google.maps.Marker({
        position , title: 'user'});
    userMarker.setMap(this.map);
  }


}
