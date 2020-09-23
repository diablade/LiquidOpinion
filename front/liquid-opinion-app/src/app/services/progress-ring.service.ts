import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ProgressRingService {

	private _display: boolean = false;

	toggleProgressRing: EventEmitter<boolean> = new EventEmitter<boolean>();

	show() {
		this.display = true;
	}

	hide() {
		this.display = false;
	}

	set display(show: boolean) {
		this._display = show;
		this.toggleProgressRing.emit(this._display);
	}


}
