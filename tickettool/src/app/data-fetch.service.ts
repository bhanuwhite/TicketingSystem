import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './constant';
@Injectable({
  providedIn: 'root'
})
export class DataFetchService {


  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get<User[]>('assets/data.json');
  }
}
