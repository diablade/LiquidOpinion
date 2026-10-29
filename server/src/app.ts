import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import { connectDB } from './config/db';
import { configurePassport } from './config/passport';
import { globalLimiter } from './middleware/rateLimiter';
import { apiRouter } from './router';
import { errorHandler, notFound } from './middleware/errorHandler';
import { seedAdmin } from './modules/auth/auth.service';
import { startScheduler } from './modules/archive/archive.service';
import { env } from './config/env';

const app = express();

app.use(helmet());
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], allowedHeaders: ['Authorization', 'Content-Type'] }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(globalLimiter);

configurePassport();
app.use(passport.initialize());

app.use('/api', apiRouter);
app.use(notFound);
app.use(errorHandler);

async function start(): Promise<void> {
  await connectDB();
  await seedAdmin();
  startScheduler();
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port} [${env.nodeEnv}]`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

export { app };
