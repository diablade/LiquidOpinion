// Runs once on first container start via docker-entrypoint-initdb.d
db = db.getSiblingDB(process.env['MONGO_INITDB_DATABASE'] || 'liquidopinion');
db.createUser({
  user: 'appuser',
  pwd: 'apppass',
  roles: [{ role: 'readWrite', db: process.env['MONGO_INITDB_DATABASE'] || 'liquidopinion' }],
});
