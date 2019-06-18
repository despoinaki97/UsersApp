import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  url: string;
  // user: User;
  constructor(private http: HttpClient) {
  }

  getUserData(user: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      console.log(user);
      this.http.get(`${this.url}/${user}`).toPromise()
          .then((data: User[]= []) => {
            // console.log(data);
            resolve(data);
          })
          .catch(erro => {
            reject(erro);
          });
    });
  }
}
