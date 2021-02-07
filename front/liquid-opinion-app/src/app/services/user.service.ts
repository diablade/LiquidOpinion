import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {LocalStorageService} from './local-storage/local-storage.service';
import {User} from '../models/user';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	// = new ReplaySubject<User>(1);
	userSubject = new Subject<User>();

	constructor(
		private http: HttpClient,
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

	// updateUser(user: User): Observable<any> {
	// 	return this.http....(user).pipe(
	// 		map(
	// 			() => this.loadUser().subscribe()
	// 		)
	// 	);
	// }
	//
	public loadUser() {
		return this.http.get<User>(environment.API_HOST + environment.API_CONTROLLEURS.USER + environment.API_ENDPOINTS.ME).pipe(
			map((user: User) => {
				this._user = user;
				this.emitUser(user);
			})
		);
	}

	private emitUser(user: User) {
		this.userSubject.next(user);
	}
}

