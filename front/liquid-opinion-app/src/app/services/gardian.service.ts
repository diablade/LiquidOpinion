import { Injectable } from '@angular/core';
// import {JwksValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class GardianService {
  
  logInGardian () {
    //redirect to guardian...
    window.location.href=
        environment.authConfig.loginUrl +
        '&scope=' + encodeURIComponent(environment.authConfig.scope) +
        '&response_type=' + encodeURIComponent(environment.authConfig.responseType) +
        '&client_id=' + encodeURIComponent(environment.authConfig.clientId) +
        '&redirect_uri=' + encodeURIComponent(environment.authConfig.redirectUri);
  }
}
