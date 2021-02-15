import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Survey} from '../models/survey';
import {catchError, retry} from 'rxjs/operators';
import {HttpErrorService} from './http-error.service';

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

	constructor(public http: HttpClient, private errorService: HttpErrorService) {
	}

	/**
	 * Get surveys with some filter
	 */
	public getSurveys(filter: string): Observable<Survey> {
		return this.http.get<Survey>(environment.API_HOST + environment.API_CONTROLLEURS.SURVEY + filter)
			.pipe(
				retry(1),
				catchError(this.errorService.handleError)
			);

	}
}
