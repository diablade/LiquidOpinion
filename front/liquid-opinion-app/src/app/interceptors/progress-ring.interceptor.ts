import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ProgressRingService} from '../services/progress-ring.service';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgressRingInterceptor implements HttpInterceptor {

  private queries: number = 0;

  constructor(private progressRingService: ProgressRingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.queries++;

    this.progressRingService.show();

    return next.handle(req).pipe(
      finalize(() => {
        this.queries--;

        if (this.queries === 0) {
          this.progressRingService.hide();
        }
      })
    );
  }
}
