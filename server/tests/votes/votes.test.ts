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
  const res = await request(app).post('/api/auth/signup').send({
    email: `vote_${suffix}@test.com`,
    username: `vote_${suffix}`,
    password: 'Test1234!',
  });
  return res.body.accessToken as string;
}

async function createAndActivateSurvey(token: string) {
  const { body: survey } = await request(app)
    .post('/api/surveys')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'Vote Test Survey',
      description: 'Description',
      reVoteDelayMs: 0,
      candidates: [{ title: 'Option A' }, { title: 'Option B' }],
    });

  await request(app)
    .patch(`/api/surveys/${survey._id}/publish`)
    .set('Authorization', `Bearer ${token}`)
    .send({ activate: true });

  return survey;
}

describe('POST /api/votes', () => {
  it('accepts a valid vote', async () => {
    const token = await registerAndLogin('v1');
    const survey = await createAndActivateSurvey(token);
    const candidateId = survey.candidates[0]._id;

    const res = await request(app)
      .post('/api/votes')
      .set('Authorization', `Bearer ${token}`)
      .send({ surveyId: survey._id, candidateId, opinionId: 'good' });

    expect(res.status).toBe(201);
  });

  it('rejects vote on inactive survey', async () => {
    const token = await registerAndLogin('v2');
    const { body: survey } = await request(app)
      .post('/api/surveys')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Inactive Survey',
        description: 'Description',
        candidates: [{ title: 'A' }, { title: 'B' }],
      });

    const res = await request(app)
      .post('/api/votes')
      .set('Authorization', `Bearer ${token}`)
      .send({ surveyId: survey._id, candidateId: survey.candidates[0]._id, opinionId: 'good' });

    expect(res.status).toBe(400);
  });

  it('rejects invalid opinionId', async () => {
    const token = await registerAndLogin('v3');
    const survey = await createAndActivateSurvey(token);

    const res = await request(app)
      .post('/api/votes')
      .set('Authorization', `Bearer ${token}`)
      .send({ surveyId: survey._id, candidateId: survey.candidates[0]._id, opinionId: 'nonexistent' });

    expect(res.status).toBe(400);
  });
});

describe('GET /api/votes/tally/:surveyId', () => {
  it('returns tally with correct counts', async () => {
    const token = await registerAndLogin('tally1');
    const voterToken = await registerAndLogin('tally2');
    const survey = await createAndActivateSurvey(token);
    const candidateId = survey.candidates[0]._id;

    await request(app)
      .post('/api/votes')
      .set('Authorization', `Bearer ${voterToken}`)
      .send({ surveyId: survey._id, candidateId, opinionId: 'excellent' });

    const res = await request(app).get(`/api/votes/tally/${survey._id}`);
    expect(res.status).toBe(200);
    const candidateTally = res.body.find((t: any) => t.candidateId === candidateId);
    expect(candidateTally.results['excellent']).toBe(1);
    expect(candidateTally.totalVotes).toBe(1);
  });
});
