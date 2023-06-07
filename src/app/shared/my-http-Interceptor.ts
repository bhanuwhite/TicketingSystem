import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Intercepted request:', request);

    if (localStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
    }
    return next.handle(request).pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        if (error.status === 401) {
          localStorage.clear();
          this.router.navigateByUrl('/login');
        }

        return throwError(() => error);
      })
    );
  }
}
