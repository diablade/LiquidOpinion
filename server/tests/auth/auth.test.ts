import request from 'supertest';
import { app } from '../../src/app';
import { connectTestDB, clearTestDB, disconnectTestDB } from '../setup/db';
import { configurePassport } from '../../src/config/passport';

beforeAll(async () => {
  await connectTestDB();
  configurePassport();
});
afterEach(async () => clearTestDB());
afterAll(async () => disconnectTestDB());

describe('POST /api/auth/signup', () => {
  it('creates a user and returns a token', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      email: 'alice@example.com',
      username: 'alice',
      password: 'Alice1234!',
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body.user.email).toBe('alice@example.com');
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('rejects duplicate email', async () => {
    const payload = { email: 'bob@example.com', username: 'bob', password: 'Bob1234!' };
    await request(app).post('/api/auth/signup').send(payload);
    const res = await request(app).post('/api/auth/signup').send(payload);
    expect(res.status).toBe(409);
  });

  it('rejects weak password', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      email: 'weak@example.com',
      username: 'weakuser',
      password: 'weak',
    });
    expect(res.status).toBe(422);
  });
});

describe('POST /api/auth/login', () => {
  it('returns token for valid credentials', async () => {
    await request(app).post('/api/auth/signup').send({
      email: 'carol@example.com',
      username: 'carol',
      password: 'Carol1234!',
    });
    const res = await request(app).post('/api/auth/login').send({
      email: 'carol@example.com',
      password: 'Carol1234!',
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('rejects wrong password', async () => {
    await request(app).post('/api/auth/signup').send({
      email: 'dave@example.com',
      username: 'dave',
      password: 'Dave1234!',
    });
    const res = await request(app).post('/api/auth/login').send({
      email: 'dave@example.com',
      password: 'wrongpassword',
    });
    expect(res.status).toBe(401);
  });

  it('rejects unknown email', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'nobody@example.com',
      password: 'Nobody1234!',
    });
    expect(res.status).toBe(401);
  });
});

describe('GET /api/auth/me', () => {
  it('returns current user with valid token', async () => {
    const signupRes = await request(app).post('/api/auth/signup').send({
      email: 'eve@example.com',
      username: 'eve',
      password: 'Eve12345!',
    });
    const token = signupRes.body.accessToken;
    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.user.username).toBe('eve');
  });

  it('rejects missing token', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
  });
});
