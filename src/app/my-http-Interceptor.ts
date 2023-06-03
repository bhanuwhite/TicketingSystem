import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted request:', request);

    if (localStorage.getItem('token')) {
        request = request.clone({
            setHeaders: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
      
            }
          });
    }
    // Pass the modified request to the next handler
    return next.handle(request);
  }
}
