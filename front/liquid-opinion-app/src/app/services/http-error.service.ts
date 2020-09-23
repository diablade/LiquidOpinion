import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {HttpErrorSnackbarComponent} from '../modals/http-error-snackbar/http-error-snackbar.component';

@Injectable({
	providedIn: 'root'
})
export class HttpErrorService {

	durationInSeconds = 5;

	constructor(private _snackBar: MatSnackBar) {}

	showError(message: string) {
		this._snackBar.openFromComponent(HttpErrorSnackbarComponent, {
			duration: this.durationInSeconds * 1000,
			verticalPosition: 'top',
			data: {
				message: message
			}
		})
	}
}
