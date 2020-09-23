import {Inject, Injectable} from '@angular/core';
import {UserService} from './user.service';
import {LoginProdiver} from '../providers/login.provider';
import {StorageKey} from './local-storage/storage-key.const';
import {LocalStorageService} from './local-storage/local-storage.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {GardianService} from './gardian.service';
import {APP_CONFIG, AppConfig} from '../config/app-config';
import {environment} from '../../environments/environment';
import {SessionStorageService} from './local-storage/session-storage.service';
import {ClearAppService} from './clear-app.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private jwtHelper = new JwtHelperService();

	constructor(
		private loginProvider: LoginProdiver,
		private gardian: GardianService,
		private router: Router,
		private localStorageService: LocalStorageService,
		private sessionStorageService: SessionStorageService,
		private userService: UserService,
		private clearAppService: ClearAppService,
		@Inject(APP_CONFIG) private config: AppConfig) {
	}

	isAuthenticated(): boolean {
		const token = this.localStorageService.getItem(StorageKey.token);
		if (!token) {
			return false;
		}

		return !this.jwtHelper.isTokenExpired(token);
	}

	loginForDebug(login: string) {
		return this.loginProvider.loginForDebug(login).pipe(
			map((data: any) => {
				this.authenticateUser(data.token);
			})
		);
	}

	loginGardianCode(gardianCode: string) {
		return this.loginProvider.loginByGardianCode(gardianCode).pipe(
			map((data: any) => {
				this.authenticateUser(data.token);
			})
		);
	}

	authenticateUser(token: string) {
		this.localStorageService.setItem(StorageKey.token, token);
	}

	logout() {
		if (this.localStorageService.getItem(StorageKey.token)) {
			this.loginProvider.logout(this.localStorageService.getItem(StorageKey.token)).subscribe(
				() => {
					this.clear();
				},
				()=>{
					this.clear();
				}
			);
		} else {
			this.clear();
		}
	}

	private clear() {
		this.clearAppService.clearApp();
		this.router.navigate([this.config.logoutPage]);
	}
}
