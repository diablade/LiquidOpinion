import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpErrorCode} from '../enums/http-error-code';
import {HttpErrorService} from '../services/http-error.service';

@Injectable({
	providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

	constructor(private httpErrorService: HttpErrorService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			tap((event: HttpEvent<any>) => {},
				(err: any) => {
					if (err instanceof HttpErrorResponse) {
						switch (err.status) {
							case HttpErrorCode.BadRequest:
								this.httpErrorService.showError('Requête non conforme.');
								break;

							case HttpErrorCode.Unauthorized:
								this.httpErrorService.showError('Vous devez être authentifié pour avoir accès à la ressource.');
								break;

							case HttpErrorCode.Forbidden:
								this.httpErrorService.showError('Requête non autorisée.');
								break;

							case HttpErrorCode.NotFound:
								this.httpErrorService.showError('Ressource non trouvée.');
								break;

							case HttpErrorCode.TimeOut:
								this.httpErrorService.showError('Le temps d\'attente de la requête a été dépassé.');
								break;

							case HttpErrorCode.InternalServerError:
								this.httpErrorService.showError('Une erreur sur le serveur distant est intervenue.');
								break;
						}
					}
				})
		);
	}

}
