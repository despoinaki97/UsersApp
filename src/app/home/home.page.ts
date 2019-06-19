import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserService} from '../services/userservice/user.service';
import {User} from '../../models/user';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  // posts: Observable<any>;
  users: User[];
  url = 'http://jsonplaceholder.typicode.com/users';

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

  // getUser(user: number): Promise<any[]> {
  //   return new Promise((resolve, reject) => {
  //     this.http.get(this.url).toPromise()
  //         .then((data: any[]) => { resolve(data); } )
  //         .catch(err => reject(err));
  //     console.log(user);
  //   });
  // }



}
