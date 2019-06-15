import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserService} from '../services/userservice/user.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  // posts: Observable<any>;
  users: any[] = [];

  constructor(public http: HttpClient, public userServ: UserService) {
    // console.log('Hello RestServiceProvider Provider');
    //
    // /*this.posts = this.http.get('http://jsonplaceholder.typicode.com/users');*/
    // this.http.get('http://jsonplaceholder.typicode.com/users')
    //     .subscribe((data: any[]) => {
    //        console.log('my data: ', data);
    //        this.posts = data;
    //      });
  }

  ngOnInit(): void {
        this.userServ.getUsers()
            .then( (promData) => this.users = promData)
            .catch(err => console.log(err));
  }

    getDetails(user: any) {
      console.log(user);
    }

}
