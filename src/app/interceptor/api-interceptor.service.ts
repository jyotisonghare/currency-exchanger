import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { SpinnerService } from '../services/spinner-service/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService {

  constructor( private spinnerService : SpinnerService,) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.requestStarted();
    request = request.clone({
      setHeaders: {
        // 'apikey': `DbgfzSeL0uug0iZiAArUj4b4R7TrHJfO`
        // 'apikey': `cFXCIgoptQSHJCKjsqcVkK0AWbYScsFV`     
        'apikey': `Ic2MyFB8kS6BokhSriPuQGpFA08S5ldl`     
      }
    });

    // return next.handle(request);
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
              this.spinnerService.requestEnded();
          }
          return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.spinnerService.resetRequest();
          return throwError(error);
      }));
  }
}
