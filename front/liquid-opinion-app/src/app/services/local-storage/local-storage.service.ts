import {Injectable} from '@angular/core';
import {StorageKey} from './storage-key.const';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() {}

    getItem(key: string) {
        return JSON.parse(localStorage.getItem(this.formatKey(key)));
    }

    setItem(key, value) {
        localStorage.setItem(this.formatKey(key), JSON.stringify(value));
    }

    removeItem(key) {
        localStorage.removeItem(this.formatKey(key));
    }
    
    removeAllItem() {
        _.forEach(StorageKey,(key)=>{this.removeItem(key)});
    }

    private formatKey(key) {
        return StorageKey.prefixItem + key;
    }
}
