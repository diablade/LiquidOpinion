import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
	selector: 'app-http-error-snackbar',
	templateUrl: './http-error-snackbar.component.html',
	styleUrls: ['./http-error-snackbar.component.scss']
})
export class HttpErrorSnackbarComponent {
	message: string;

	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
		if (data.message) {
			this.message = data.message;
		}
	}
}
