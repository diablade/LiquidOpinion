import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Survey} from '../models/survey';
import {catchError, map, retry} from 'rxjs/operators';
import {SnackbarService} from './snackbar.service';

@Injectable({
	providedIn: 'root'
})
export class SurveyService {

	// Http Options
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	constructor(public http: HttpClient, private snackService: SnackbarService) {
	}

	/**
	 * Get surveys with some filter
	 */
	public getSurveys(filter: string): Observable<Survey> {
		return this.http.get<Survey>(environment.API_HOST + environment.API_CONTROLLEURS.SURVEY + filter)
			.pipe(
				retry(1),
				// catchError(this.errorService.handleError)
			);

	}

//	/**
// 	 * Get surveys with some filter
// 	 */
// 	public getSurveys(filter: string): Observable<Survey> {
// 		return this.http.get<any>(environment.API_HOST + environment.API_CONTROLLEURS.SURVEY + filter)
// 			.pipe(map(surveys => {
// 					return surveys;
// 				}));
// 		// .catchError(err => {
// 		// 		let errorMessage = '';
// 		// 		if (err.error instanceof ErrorEvent) {
// 		// 			// Get client-side error
// 		// 			errorMessage = err.error.message;
// 		// 		} else {
// 		// 			// Get server-side error
// 		// 			errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
// 		// 		}
// 		// 		this.snackService.showError(errorMessage);
// 		// 		return throwError(errorMessage);
// 		//
// 		// 	}
// 		// )
// 		// )
// 		// 	;
// 	}
}
