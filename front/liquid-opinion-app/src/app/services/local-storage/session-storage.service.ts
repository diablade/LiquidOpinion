import {Injectable} from '@angular/core';
import {StorageKey} from './storage-key.const';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {

    constructor() {}

    getItem(key) {
        return JSON.parse(sessionStorage.getItem(this.formatKey(key)));
    }

    setItem(key, value) {
        sessionStorage.setItem(this.formatKey(key), JSON.stringify(value));
    }

    removeItem(key) {
        sessionStorage.removeItem(this.formatKey(key));
    }
    
    removeAllItem() {
        _.forEach(StorageKey,(key)=>{this.removeItem(key)});
    }

    private formatKey(key) {
        return StorageKey.prefixItem + key;
    }
    
}
