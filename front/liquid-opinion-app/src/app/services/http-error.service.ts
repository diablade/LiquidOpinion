import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackbarComponent} from '../components/snackbar/snackbar.component';
import {throwError} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HttpErrorService {

	durationInSeconds = 5;

	constructor(private snackBar: MatSnackBar) {
	}

	/**
	 * Error handling
	 */
	// tslint:disable-next-line:typedef
	showError(message: string) {
		this.snackBar.openFromComponent(SnackbarComponent, {
			duration: this.durationInSeconds * 1000,
			verticalPosition: 'top',
			data: {
				message
			}
		});
	}

	// tslint:disable-next-line:typedef
	handleError(error) {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			// Get client-side error
			errorMessage = error.error.message;
		} else {
			// Get server-side error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		this.showError(errorMessage);
		return throwError(errorMessage);
	}
}
