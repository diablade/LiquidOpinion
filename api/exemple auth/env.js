import dotenv from 'dotenv'

dotenv.config({path: '../.env'});

const {
    NODE_ENV,
    VERSION,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES,
    REFRESH_TOKEN_EXPIRES,
    ENCRYPTION_KEY,
    SECRET_IV,
    ENCRYPTION_METHOD,
    PORT_NODE,
    LOG_DEBUG,
    DB_CONFIG_HOSTNAME,
    DB_CONFIG_PORT,
    DB_CONFIG_COLLECTION,
    DB_CONFIG_USER,
    DB_CONFIG_PASSWORD,
    ADMIN_USER,
    ADMIN_PASSWORD
} = process.env;

export default {
    environment:           NODE_ENV,
    version:               VERSION,
    access_token_secret:   ACCESS_TOKEN_SECRET,
    refresh_token_secret:  REFRESH_TOKEN_SECRET,
    encryption_key:        ENCRYPTION_KEY,
    secret_iv:             SECRET_IV,
    encryption_method:     ENCRYPTION_METHOD,
    port:                  PORT_NODE,
    log_debug:             LOG_DEBUG,
    db_config_hostname:    DB_CONFIG_HOSTNAME,
    db_config_port:        DB_CONFIG_PORT,
    db_config_collection:  DB_CONFIG_COLLECTION,
    db_config_user:        DB_CONFIG_USER,
    db_config_password:    DB_CONFIG_PASSWORD,
    admin_user:            ADMIN_USER,
    admin_password:        ADMIN_PASSWORD,
    access_token_expires:  ACCESS_TOKEN_EXPIRES,
    refresh_token_expires: REFRESH_TOKEN_EXPIRES
}
