export default async function globalTeardown() {
  const mongo = (global as any).__MONGO_INSTANCE__;
  if (mongo) await mongo.stop();
}
