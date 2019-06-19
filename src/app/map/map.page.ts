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
  users: User[];
  // id;
  // tslint:disable-next-line:max-line-length
  constructor(private geolocation: Geolocation, private mapService: MapService, private userService: UserService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
   const id = this.activatedRoute.snapshot.paramMap.get('id');
   this.userService.getUsers()
        .then( (promData) => {this.users = promData;
                              this.displayGoogleMap();
                              this.getMarkers(promData);
        })
        .catch(err => console.log(err));
   this.mapService.getUserData(id)
          .then((promData) => {
            this.userData = promData;
            this.displayGoogleMap();
            this.getMarkers([this.userData]);
            console.log(promData);
          })
          .catch(err => console.log(err));

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

  getMarkers(userArr: User[]) {
    if (userArr.length) {
      userArr.forEach((user: User) => {
        const position = new google.maps.LatLng(user.address.geo.lat, user.address.geo.lng);

        const userMarker = new google.maps.Marker({
          position, title: 'user'
        });
        userMarker.setMap(this.map);
      });
    }
  }


}
