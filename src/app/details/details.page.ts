import {Component, Injectable, OnInit} from '@angular/core';
import {UserService} from '../services/userservice/user.service';
import {HttpClient} from '@angular/common/http';
import {HomePage} from '../home/home.page';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
 userid: string;
 user: any;
  constructor(public homePage: HomePage, public userServ: UserService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
      const id = this.activatedRoute.snapshot.paramMap.get('id');

      this.homePage.getUser(id)
        .then( (promData) => {this.user = promData; console.log(promData); } )
        .catch(err => console.log(err));

  }

}
