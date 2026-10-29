import request from 'supertest';
import { app } from '../../src/app';
import { connectTestDB, clearTestDB, disconnectTestDB } from '../setup/db';
import { configurePassport } from '../../src/config/passport';
import { Vote } from '../../src/models/vote.model';
import { Types } from 'mongoose';

beforeAll(async () => {
  await connectTestDB();
  configurePassport();
});
afterEach(async () => clearTestDB());
afterAll(async () => disconnectTestDB());

async function registerAndLogin(suffix: string) {
  const res = await request(app).post('/api/auth/signup').send({
    email: `arch_${suffix}@test.com`,
    username: `arch_${suffix}`,
    password: 'Test1234!',
  });
  return { token: res.body.accessToken as string, userId: res.body.user._id as string };
}

async function createActiveSurvey(token: string) {
  const { body: survey } = await request(app)
    .post('/api/surveys')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'Archive Survey',
      description: 'Description',
      reVoteDelayMs: 0,
      archivePolicy: { enabled: true, retentionDays: 1 },
      candidates: [{ title: 'A' }, { title: 'B' }],
    });
  await request(app)
    .patch(`/api/surveys/${survey._id}/publish`)
    .set('Authorization', `Bearer ${token}`)
    .send({ activate: true });
  return survey;
}

describe('POST /api/archive/:surveyId/run', () => {
  it('archives old votes when triggered manually by survey admin', async () => {
    const { token } = await registerAndLogin('a1');
    const survey = await createActiveSurvey(token);
    const surveyId = new Types.ObjectId(survey._id);

    // Insert an old vote directly
    await Vote.create({
      surveyId,
      candidateId: new Types.ObjectId(survey.candidates[0]._id),
      hashedUserId: 'hasheduser',
      opinionId: 'good',
      value: 3,
      createdAt: new Date(Date.now() - 2 * 86_400_000),
    });

    const res = await request(app)
      .post(`/api/archive/${survey._id}/run`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.votesArchived).toBe(1);

    const archived = await Vote.findOne({ surveyId, archivedAt: { $exists: true } });
    expect(archived).not.toBeNull();
  });

  it('blocks a non-admin from running the archiver', async () => {
    const { token: creatorToken } = await registerAndLogin('a2');
    const { token: intruderToken } = await registerAndLogin('intruder_a');
    const survey = await createActiveSurvey(creatorToken);

    const res = await request(app)
      .post(`/api/archive/${survey._id}/run`)
      .set('Authorization', `Bearer ${intruderToken}`);

    expect(res.status).toBe(403);
  });
});
