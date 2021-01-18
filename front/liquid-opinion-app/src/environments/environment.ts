export const environment = {
  production: false,
  fakeLogin: true,

  API_HOST: 'http://localhost:3000/',

  /**
   * Endpoints du service (WebApi)
   */
  API_ENDPOINTS: {
    CREATE: 'create/',
    REGISTER: 'register/',
    UPDATE: 'update/',
    DELETE: 'delete/',
    PROFILE: 'profile/',
    GET_ALL: 'all/',
    USER: 'me/',
    LOGIN: 'login/',
    LOGOUT: 'logout',
    LOSTPWD: 'lostpassword/',
  },

  /**
   * Controlleur de l'API pour se connecter au service Times
   */
  API_CONTROLLEURS: {
    USER: 'user/',
    SURVEY: 'survey/',
    CANDIDATE: 'candidate/',
    VOTE: 'vote/',
  },

  /**
   *  AUTH CONFIG
   */
  authConfig: {
    loginUrl: 'https://rec-websso-gardian.myelectricnetwork.com/gardianwebsso/oauth2/multiauth/authorize?acr_values=sesameGROUPE&authlevel=3',
    scope: 'openid mail cn uid isMemberOf',
    clientId: '5CTIM002',
    responseType: 'code',
    redirectUri: 'https://times-web.sully-group.fr/redirect',
  }
};
