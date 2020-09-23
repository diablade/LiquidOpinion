import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(public http: HttpClient) { }

  /**
   * Get all public survey
   */
  public getPublicSurveys(): Observable<any> {
    return this.http.get(environment.API_CONTROLLEURS.SURVEY + environment.API_ENDPOINTS.PUBLIC);
  }

  public getfilteredSurveys(query: any): Observable<any> {
    return this.http.get(environment.API_CONTROLLEURS.SURVEY + environment.API_ENDPOINTS.FILTERED, query);
  }

}
