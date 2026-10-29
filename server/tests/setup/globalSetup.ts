import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo: MongoMemoryServer;

export default async function globalSetup() {
  mongo = await MongoMemoryServer.create();
  process.env['MONGO_URI'] = mongo.getUri();
  process.env['JWT_SECRET'] = 'test_secret';
  process.env['JWT_EXPIRES_IN'] = '1d';
  process.env['ADMIN_EMAIL'] = 'admin@test.local';
  process.env['ADMIN_PASSWORD'] = 'Admin1234!';
  process.env['ADMIN_USERNAME'] = 'testadmin';
  (global as any).__MONGO_INSTANCE__ = mongo;
}
