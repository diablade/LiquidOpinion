import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageKey} from '../services/local-storage/storage-key.const';
import {tap} from 'rxjs/operators';
import {LocalStorageService} from '../services/local-storage/local-storage.service';

@Injectable({
	providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

	constructor(private localStorageService: LocalStorageService) {
	}

	private static extractBearerToken(res: HttpResponse<any>): string {
		const authorization = res.headers.get('liquid-token');

		if (!authorization) {
			return null;
		}

		return authorization;

		// if (authorization.startsWith('Bearer ')) {
		// 	return authorization.substring(7, authorization.length);
		// }

		// return null;
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// if (req.url.includes("login") || req.url.includes("register")) return next.handle(req);

		const token = JSON.parse(localStorage.getItem(StorageKey.prefixItem + StorageKey.token));

		// SET TOKEN AT REQUEST TO SERVER
		req = req.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`,
				'liquid-token': token
			},
		});

		// GET TOKEN AT RESPONSE FROM SERVER
		return next.handle(req).pipe(
			tap((event: any) => {
				if (event instanceof HttpResponse) {
					const rToken = TokenInterceptor.extractBearerToken(event);

					if (rToken) {
						this.localStorageService.setItem(StorageKey.token, rToken);
					}
				}
			})
		);
	}

}
