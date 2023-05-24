import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../constant';
@Injectable({
  providedIn: 'root'
})
export class DataFetchService {
baseUrl = baseUrl;
  constructor(private http:HttpClient) { }

  getData(url:string){
    return this.http.get<any>(this.baseUrl+url);
  }
}
