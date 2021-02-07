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
	private userSubject;
	private user: User;

	constructor(
		private router: Router,
		private localStorageService: LocalStorageService,
		private sessionStorageService: SessionStorageService,
		private userService: UserService,
		private clearAppService: ClearAppService,
		private http: HttpClient) {

		this.userSubject = new BehaviorSubject<User>(null);
		this.user = this.userSubject.asObservable();
	}

	public get userValue(): User {
		return this.userSubject.value;
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
		return this.http.post<any>(environment.API_HOST + environment.API_CONTROLLEURS.USER + environment.API_ENDPOINTS.REGISTER, {
			email,
			username,
			password
		}).pipe(map(user => {
			this.userSubject.next(user);
			return user;
		}));
	}

	public login(username: string, password: string) {
		return this.http.post<any>(environment.API_HOST + environment.API_CONTROLLEURS.USER + environment.API_ENDPOINTS.LOGIN, {
			username,
			password
		}).pipe(map(user => {
			this.userSubject.next(user);
			return user;
		}));
	}

	public logout() {
		this.clearAppService.clearApp();
		this.router.navigate(['/']);
	}
}
