export const environment = {
  production: true,
  fakeLogin: true,

  API_HOST: 'https://api.liquidopinion.fr:7890/',

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
    PUBLIC: 'public/',
    FILTERED: 'filtered/',
    USER: 'me/',
    LOGIN: 'login/',
    LOGOUT: 'logout',
    LOSTPWD: 'lostpassword/',
  },

  /**
   * Controlleur de l'API pour se connecter au service Times
   */
  API_CONTROLLEURS: {
    USER: 'users/',
    SURVEY: 'survey/',
    CANDIDATE: 'candidate/',
    VOTE: 'vote/',
  },

  /**
   *  AUTH CONFIG
   */
  authConfig: {
    loginUrl: 'https://gardian.localhost.com/websso/oauth2/',
    scope: 'openid mail cn uid isMemberOf',
    clientId: '5CTIM002',
    responseType: 'code',
    redirectUri: 'https://localhost:4200/redirect',
  }
};
