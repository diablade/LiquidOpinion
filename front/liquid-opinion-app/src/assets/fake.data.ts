import * as faker from 'faker';
import {Member, Survey} from '../app/models/survey';
import {Candidate, Vote} from '../app/models/candidate';
import {User} from "../app/models/user";

export class FakeData {

  public static createFakeSurvey(id: string): Survey {
    const survey = new Survey();
    survey.id = id;
    survey.title = faker.lorem.sentence();
    survey.creator = this.createFakeMember('1');
    survey.slogan = faker.lorem.sentences();
    survey.description = faker.lorem.paragraph();
    survey.theme = faker.lorem.word();
    survey.tags = [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()];
    survey.admins = [this.createFakeMember('1'), this.createFakeMember('2')];
    survey.editors = survey.admins;
    survey.members = [this.createFakeMember('1'),
      this.createFakeMember('2'),
      this.createFakeMember('3'),
      this.createFakeMember('4')];
    survey.candidatesIds = ['1', '2', '3', '4'];
    survey.images = [
      {format: 'card', url: faker.image.image()},
      {format: 'banner', url: 'http://placeimg.com/800/200/any'}];
    survey.activate = true;
    survey.visibleBySearch = true;
    survey.isPrivate = false;
    survey.typeOfVote = 'label';
    survey.noteLabels = ['rejeter', 'mauvais', 'neutre', 'bien', 'excellent'];
    survey.reVoteDelay = '1D';
    survey.expireAt = new Date();
    survey.selfDestruct = new Date();
    survey.modified = new Date();
    survey.created = new Date();
    return survey;
  }

  public static createFakeMember(id: string): Member {
    const member = new Member();
    member.id = id;
    member.username = faker.internet.userName();
    member.photo = faker.image.image();
    return member;
  }

  public static createFakeUser(): User {
    const user = new User();
    user.created = new Date();
    user.description = faker.lorem.paragraph();
    user.email = faker.internet.email();
    user.first_name = faker.name.firstName();
    user.last_name = faker.name.lastName();
    user.username = faker.internet.userName();
    user.photo = faker.image.abstract();

    return user;
  }

  // tslint:disable-next-line:typedef
  public static createFakeCandidate(id: string, idS: string): Candidate {
    const candidate = new Candidate();
    candidate.id = id;
    candidate.title = faker.lorem.words();
    candidate.surveyId = idS;
    candidate.description = faker.lorem.paragraph();
    candidate.votes = [
      {note: 5, noteMax: 5, date: new Date()},
      {note: 4, noteMax: 5, date: new Date()},
      {note: 4, noteMax: 5, date: new Date()},
      {note: 3, noteMax: 5, date: new Date()},
      {note: 1, noteMax: 5, date: new Date()},
      {note: 2, noteMax: 5, date: new Date()},
      {note: 5, noteMax: 5, date: new Date()}];
    candidate.noteMax = 5;
    candidate.images = faker.image.image();
    candidate.modified = new Date();
    candidate.created = new Date();
    return candidate;
  }

  public static createFakeOneDayStat() {
    const reject = faker.random.number(10000);
    const good = faker.random.number(10000);
    const bad = faker.random.number(10000);
    const neutral = faker.random.number(10000);
    const excellent = faker.random.number(10000);

    const total = reject + good + bad + neutral + excellent;
    const pR = (reject / total) * 100;
    const pG = (good / total) * 100;
    const pB = (bad / total) * 100;
    const pN = (neutral / total) * 100;
    const pE = (excellent / total) * 100;
    return [pE, pG, pN, pB, pR];
  }
}
