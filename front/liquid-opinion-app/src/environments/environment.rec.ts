import { version } from '../../package.json';

export const environment = {
	version: version,
	production: false,
	fakeLogin: false,

	/**
	 * Endpoints du service (WebApi) de Times Web
	 */
	API_ENDPOINTS: {
		CONNEXION: 'Connexion/',
		MATERIAL: 'material/',
		MATERIALS: 'materials/',
		LISTEALLGROUPEINTERVENTION: 'ListeAllGroupeIntervention/',
		LISTEALLDIRECTIONOUAGENCE: 'ListeAllDirectionOuAgence/',
		PROFILE: 'profile/',
		IDENTITY_CARD: 'materiel/fiche-identite/',
		PROFILE_UPDATE: 'update/',
		ACTIVITIES: 'activities/',
		ACTIVITIES_EXPORT: 'export-activities/',
		GEAR: 'equipement/',
		ASSIGNED: 'material/assigned/',
		TECHNICAL_CHARACTERISTIC: 'technical-characteristic/',
		TECHNICAL_CHARACTERISTICS: 'technical-characteristics/',
		GET_USER: 'getuser/',
		GET_FILTERS: 'user/',
		SAVE_FILTERS: 'save/',
		UPDATE_FILTERS: 'update/',
		DELETE_FILTERS: 'delete/',
		GET_USER_PROFILE: 'user/',
		INDIVIDUALS: 'users/',
		UNREGISTER: 'user/unregister/',
		INFORMATION: 'information/',
		INVENTORY_COUNTER :'inventory-counter/',
		STATS_COUNTER: 'statistic-counter/',
		STATES: "states/",
		REPOSITORIES: "customer-data-repository/",
		LOGIN: 'login/',
		LOGIN_FOR_DEBUG: "login-for-debug/",
		GEOLOCATION_DATA: "geolocation-data/",
		USER: "user/",
		ROOMS: "rooms/",
		VEHICLES: "vehicles/",
		VEHICLES_BY_ID: "vehicle-by-id",
		ROOMS_BY_ID: "room-by-id",
		EQUIPS_CYCLE: 'materials-for-lifecycle',
		EQUIPS_REPORT: 'materials-for-reporting',
		EQUIPS_INVENT: 'materials-for-inventory',
		UPDATE_BASE: 'user/update-base',
		DATA: 'data/',
		LOGOUT: 'logout'
	},

	/**
	 * Controlleur de l'API pour se connecter au service Times
	 */
	API_CONTROLLEURS: {
		GET_USER: 'users/',
		SEARCH: 'search/',
		GROUPEINTERVENTION: 'GroupeIntervention/',
		PROFILE: 'profile/',
		FICHE_IDENTITE: 'identity-card/',
		INVENTORY: 'inventory/',
		FILTERS: 'filters/',
		ADMINISTRATION: 'administration/',
		INFORMATION: 'information/',
		AUTHENTICATE: 'authenticate/',
		NEWS: 'news/',
		FILE: 'file/'
	},

	/**
	 * URLs des différentes API
	 * Read : API de lecture
	 * Write : API d'écriture
	 * Search : API de recherche
	 */
	API_URL: {
		READ: 'https://times-read-api.sully-group.fr/rec/api/', // URL de développement (server ASP .NET Core Web API local)
		WRITE: 'https://times-write-api.sully-group.fr/rec/api/', // URL de développement (server ASP .NET Core Web API local)
		SEARCH: 'https://times-search-api.sully-group.fr/rec/api/search/', // URL de développement (server ASP .NET Core Web API local)
		AUTH: 'https://times-auth-api.sully-group.fr/rec/api/', // URL de développement (server ASP .NET Core Web API local)
	},

	/**
	 *  AUTH CONFIG
	 */
	authConfig: {
		loginUrl: 'https://rec-websso-gardian.myelectricnetwork.com/gardianwebsso/oauth2/multiauth/authorize?acr_values=sesameGROUPE',
		redirectUri: 'https://times-web.sully-group.fr/redirect',
		scope: 'openid mail cn uid isMemberOf',
		clientId: '5CTIM002',
		responseType: 'code',
	}
};
