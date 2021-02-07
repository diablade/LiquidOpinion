export const environment = {
	production: false,
	fakeLogin: true,

	API_HOST: 'http://localhost:3000/',

	/**
	 * Endpoints du service (WebApi)
	 */
	API_ENDPOINTS: {
		CREATE: 'create/',
		REGISTER: 'register',
		UPDATE: 'update/',
		DELETE: 'delete/',
		PROFILE: 'profile/',
		GET_ALL: 'all/',
		ME: 'me/',
		LOGIN: 'login/',
		LOGOUT: 'logout',
		LOSTPWD: 'lostpassword/',
	},

	/**
	 * Controlleur de l'API pour se connecter au service
	 */
	API_CONTROLLEURS: {
		USER: 'user/',
		SURVEY: 'survey/',
		CANDIDATE: 'candidate/',
		VOTE: 'vote/',
	},

};
