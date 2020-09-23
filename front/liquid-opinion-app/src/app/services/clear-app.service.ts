import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage/local-storage.service';
import {SessionStorageService} from './local-storage/session-storage.service';
import {UserService} from './user.service';
import {SearchService} from './search.service';

@Injectable({
	providedIn: 'root'
})
export class ClearAppService {

	constructor(
		private localStorageService: LocalStorageService,
		private sessionStorageService: SessionStorageService,
		private userService: UserService,
		private searchService: SearchService) {}

		clearApp() {
			this.sessionStorageService.removeAllItem();
			this.localStorageService.removeAllItem();

			this.searchService.clearCache();
			this.userService.logout();
		}
}
