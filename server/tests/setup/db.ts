import mongoose from 'mongoose';

export async function connectTestDB(): Promise<void> {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env['MONGO_URI']!);
  }
}

export async function clearTestDB(): Promise<void> {
  const collections = mongoose.connection.collections;
  for (const key of Object.keys(collections)) {
    await collections[key]!.deleteMany({});
  }
}

export async function disconnectTestDB(): Promise<void> {
  await mongoose.disconnect();
}
