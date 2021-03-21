import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {LocalStorageService} from './local-storage/local-storage.service';
import {User} from '../models/user';
import {catchError, map, retry} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SnackbarService} from './snackbar.service';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	// = new ReplaySubject<User>(1);
	userSubject = new Subject<User>();

	constructor(
		private http: HttpClient,
		private snackService: SnackbarService,
		private localStorageService: LocalStorageService) {
	}

	private _user: User;

	get user(): User {
		return this._user;
	}

	set user(user: User) {
		this._user = user;
		this.emitUser(user);
	}

	public loadUser() {
		return this.http.get<User>(environment.API_HOST + environment.API_CONTROLLEURS.USER + environment.API_ENDPOINTS.ME)
			.pipe(
				retry(1),
				catchError(
					err => {
						let errorMessage = '';
						if (err.error instanceof ErrorEvent) {
							// Get client-side error
							errorMessage = err.error.message;
						} else {
							// Get server-side error
							errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
						}
						this.snackService.showError(errorMessage);
						return throwError(errorMessage);
					}
				),
				map((user: User) => {
						this._user = user;
						this.emitUser(user);
					}
				)
			);
	}

	private emitUser(user: User) {
		this.userSubject.next(user);
	}
}

