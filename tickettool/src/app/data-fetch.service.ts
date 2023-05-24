import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './constant';
@Injectable({
  providedIn: 'root'
})
export class DataFetchService {

baseUrl="http://192.168.0.166:3000/api/"
  constructor(private http:HttpClient) { }

  getData(url:string){
    return this.http.get<any>(this.baseUrl+url);
  }
}
