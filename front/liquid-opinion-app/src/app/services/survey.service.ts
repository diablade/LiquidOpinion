import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Survey} from "../models/survey";
import {catchError, retry} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class SurveyService {

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(public http: HttpClient) {
    }

    /**
     * Get surveys with some filter
     */
    public getSurveys(filter: String): Observable<Survey> {
        return this.http.get<Survey>(environment.API_HOST + environment.API_CONTROLLEURS.SURVEY + filter)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );

    }

    // Error handling
    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}
