import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {error} from 'selenium-webdriver';
import {User} from '../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    user: User;
  url: string;
  constructor(public http: HttpClient) {}

  getUsers(): Promise<User[]> {
   return new Promise((resolve, reject) => {
      this.http.get(this.url).toPromise()
          .then((data: User[]) => { resolve(data); } )
          .catch(err => reject(err));
   });
  }

    getUser(user: number): Promise<any[]> {
        return new Promise((resolve, reject) => {
            console.log(user);
            this.http.get(`${this.url}/${user}`).toPromise()
                .then((data: any[]) => { console.log(data); resolve(data); })
                .catch(erro => {reject(erro); } );
        });
        // console.log(user);
    }

}
