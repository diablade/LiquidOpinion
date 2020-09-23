import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {APP_CONFIG, AppConfig} from '../../config/app-config';
import {UserService} from "../user.service";
import {map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class UserTempGuard implements CanActivate {
	
	constructor(
		private router: Router,
		private userService: UserService,
		@Inject(APP_CONFIG) private config: AppConfig) {
	}
	
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		// TODO: voir pour ne pas faire 2 appels loadUser() (app component + UserTempGuard)
		if(!this.userService.user) {
			return this.userService.loadUser().pipe(
				map(() => {
					return this.isValidateUser();
				})
			);
		}

		return this.isValidateUser();
	}

	isValidateUser() {
		if (!this.userService.hasBaseOpPref()) {
			this.router.navigate([this.config.nonValidationUserPage]);
			return false;
		}

		return true;
	}
}
