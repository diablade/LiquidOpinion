import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {LocalStorageService} from './local-storage/local-storage.service';
import {User} from '../models/user';
import {map} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    // = new ReplaySubject<User>(1);
    userSubject = new Subject<User>();

    private _user: User;

    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService,) {
    }

    get user() {
        return this._user;
    }

    updateUser(user: User): Observable<any> {
        return this.userProvider.updateUserProfile(user).pipe(
            map(
                () => this.loadUser().subscribe()
            )
        );
    }

    public loadUser() {
        return this.userProvider.getUser().pipe(
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

