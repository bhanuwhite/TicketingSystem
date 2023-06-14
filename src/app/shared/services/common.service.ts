import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../constant';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataFetchService {
baseUrl = baseUrl;
  constructor(private http:HttpClient) { }

  getData(url:string){
    return this.http.get<any>(this.baseUrl+url);
  }
  postData(url:string,body:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+url,body);
  }
  putData(url:string,body:any){
    return this.http.put<any>(this.baseUrl+url,body);
  }
}
{}
