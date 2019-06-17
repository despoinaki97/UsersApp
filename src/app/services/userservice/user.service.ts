import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {error} from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string;
  constructor(public http: HttpClient) {}

  getUsers(): Promise<any[]> {
   return new Promise((resolve, reject) => {
      this.http.get(this.url).toPromise()
          .then((data: any[]) => { resolve(data); } )
          .catch(err => reject(err));
   });
  }


}
