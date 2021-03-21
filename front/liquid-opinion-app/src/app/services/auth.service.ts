import {Inject, Injectable} from '@angular/core';
import {UserService} from './user.service';
import {StorageKey} from './local-storage/storage-key.const';
import {LocalStorageService} from './local-storage/local-storage.service';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
import {SessionStorageService} from './local-storage/session-storage.service';
import {ClearAppService} from './clear-app.service';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from '../models/user';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private jwtHelper = new JwtHelperService();

	constructor(
		private router: Router,
		private localStorageService: LocalStorageService,
		private sessionStorageService: SessionStorageService,
		private userService: UserService,
		private clearAppService: ClearAppService,
		private http: HttpClient) {
	}


	public isAuthenticated(): boolean {
		const token = this.localStorageService.getItem(StorageKey.token);
		if (!token) {
			return false;
		}
		return !this.jwtHelper.isTokenExpired(token);
	}

	authenticateUser(token: string) {
		if (!token) {
			return false;
		} else {
			this.localStorageService.setItem(StorageKey.token, token);
		}
	}

	public register(email: string, username: string, password: string) {
		return this.http.post<User>(environment.API_HOST + environment.API_CONTROLLEURS.USER + environment.API_ENDPOINTS.REGISTER, {
			email,
			username,
			password
		}).pipe(map(user => {
			this.userService.user = user;
			return user;
		}));
	}

	public login(email: string, password: string) {
		return this.http.post<User>(environment.API_HOST + environment.API_CONTROLLEURS.USER + environment.API_ENDPOINTS.LOGIN, {
			email,
			password
		}).pipe(map(user => {
			this.userService.user = user;
			return user;
		}));
	}

	public logout() {
		console.log('logged out');
		this.userService.user = null;
		this.clearAppService.clearApp();
		this.router.navigate(['/']);
	}
}
