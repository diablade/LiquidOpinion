import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {APP_CONFIG, AppConfig} from '../../config/app-config';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	
	constructor(
		private router: Router,
		private auth: AuthService,
		@Inject(APP_CONFIG) private config: AppConfig) {
	}
	
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.auth.isAuthenticated()) {
			return true;
		}

		this.auth.logout();
		return false;
	}
}
