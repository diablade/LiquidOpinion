import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {LocalStorageService} from './local-storage/local-storage.service';
import {StorageKey} from './local-storage/storage-key.const';
import {User} from '../models/user';
import * as _ from 'lodash';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedGeolocationSubject = new ReplaySubject<Geolocalisation>(1);

  userSubject = new Subject<User>();
  private _user: User;

  constructor(
    private localStorageService: LocalStorageService,
    private userProvider: UserProvider) {
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

