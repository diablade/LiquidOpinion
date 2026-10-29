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

async function registerAndLogin(suffix: string) {
  const signup = await request(app).post('/api/auth/signup').send({
    email: `user_${suffix}@test.com`,
    username: `user_${suffix}`,
    password: 'Test1234!',
  });
  return signup.body.accessToken as string;
}

const minimalSurvey = {
  title: 'Test Survey',
  description: 'A test survey description',
  candidates: [
    { title: 'Option A' },
    { title: 'Option B' },
  ],
};

describe('POST /api/surveys', () => {
  it('creates a survey when authenticated', async () => {
    const token = await registerAndLogin('creator1');
    const res = await request(app)
      .post('/api/surveys')
      .set('Authorization', `Bearer ${token}`)
      .send(minimalSurvey);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test Survey');
    expect(res.body.slug).toBe('test-survey');
    expect(res.body.activate).toBe(false);
  });

  it('rejects unauthenticated creation', async () => {
    const res = await request(app).post('/api/surveys').send(minimalSurvey);
    expect(res.status).toBe(401);
  });

  it('rejects survey with fewer than 2 candidates', async () => {
    const token = await registerAndLogin('creator2');
    const res = await request(app)
      .post('/api/surveys')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...minimalSurvey, candidates: [{ title: 'Only one' }] });
    expect(res.status).toBe(422);
  });
});

describe('PATCH /api/surveys/:id/publish', () => {
  it('allows creator to publish their survey', async () => {
    const token = await registerAndLogin('pub1');
    const { body: survey } = await request(app)
      .post('/api/surveys')
      .set('Authorization', `Bearer ${token}`)
      .send(minimalSurvey);

    const res = await request(app)
      .patch(`/api/surveys/${survey._id}/publish`)
      .set('Authorization', `Bearer ${token}`)
      .send({ activate: true });

    expect(res.status).toBe(200);
    expect(res.body.activate).toBe(true);
  });

  it('prevents a non-member from publishing', async () => {
    const creatorToken = await registerAndLogin('pub2');
    const intruderToken = await registerAndLogin('intruder2');

    const { body: survey } = await request(app)
      .post('/api/surveys')
      .set('Authorization', `Bearer ${creatorToken}`)
      .send(minimalSurvey);

    const res = await request(app)
      .patch(`/api/surveys/${survey._id}/publish`)
      .set('Authorization', `Bearer ${intruderToken}`)
      .send({ activate: true });

    expect(res.status).toBe(403);
  });
});

describe('GET /api/surveys', () => {
  it('lists only active public surveys', async () => {
    const token = await registerAndLogin('list1');
    const { body: survey } = await request(app)
      .post('/api/surveys')
      .set('Authorization', `Bearer ${token}`)
      .send(minimalSurvey);

    // Should not appear before activation
    let res = await request(app).get('/api/surveys');
    expect(res.body.surveys.length).toBe(0);

    // Activate
    await request(app)
      .patch(`/api/surveys/${survey._id}/publish`)
      .set('Authorization', `Bearer ${token}`)
      .send({ activate: true });

    res = await request(app).get('/api/surveys');
    expect(res.body.surveys.length).toBe(1);
  });
});
