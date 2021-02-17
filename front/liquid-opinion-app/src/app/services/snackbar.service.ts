import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {SnackbarComponent} from '../components/snackbar/snackbar.component';
import {throwError} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SnackbarService {

	durationInSeconds = 5;

	constructor(private snackBar: MatSnackBar) {
	}


	// tslint:disable-next-line:typedef
	showSuccess(message: string) {
		const config = new MatSnackBarConfig();
		config.panelClass = ['background-green'];
		config.politeness = 'assertive';
		config.verticalPosition = 'top';
		config.duration = 5000;
		this.snackBar.open(message, null, config);
	}

	// tslint:disable-next-line:typedef
	showError(message: string) {
		const config = new MatSnackBarConfig();
		config.panelClass = ['background-red'];
		config.politeness = 'assertive';
		config.verticalPosition = 'top';
		config.duration = 5000;
		this.snackBar.open(message, null, config);
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
