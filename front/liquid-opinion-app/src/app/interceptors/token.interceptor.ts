import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageKey} from "../services/local-storage/storage-key.const";
import {tap} from "rxjs/operators";
import {LocalStorageService} from "../services/local-storage/local-storage.service";

@Injectable({
	providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
	
	constructor(private localStorageService: LocalStorageService) {}
	
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = JSON.parse(localStorage.getItem(StorageKey.prefixItem + StorageKey.token));
		
		//SET TOKEN AT REQUEST TO SERVER
		req = req.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`
			},
		});
		
		//GET TOKEN AT RESPONSE FROM SERVER
		return next.handle(req).pipe(
			tap((event:any) => {
				if (event instanceof HttpResponse) {
					let token = this.extractBearerToken(event);

					if (token) {
						this.localStorageService.setItem(StorageKey.token,token);
					}
				}
			})
		)
	}

	private extractBearerToken(res: HttpResponse<any>) {
		const authorization = res.headers.get('Authorization');

		if (!authorization) {
			return null;
		}

		if (authorization.startsWith("Bearer ")) {
			return authorization.substring(7, authorization.length);
		}

		return null;
	}
	
}
