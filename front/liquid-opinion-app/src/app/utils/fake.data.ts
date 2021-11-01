import * as faker from 'faker';
import {Member, Survey} from '../models/survey';
import {Candidate} from '../models/candidate';
import {User} from '../models/user';

export class FakeData {

	public static createFakeSurvey(id: string): Survey {
		const survey = new Survey();
		survey.id = id;
		survey.title = faker.lorem.sentence();
		survey.slug = faker.lorem.slug();
		survey.creator = this.createFakeMember('1');
		survey.slogan = faker.lorem.sentences();
		survey.description = faker.lorem.paragraph();
		survey.themes = [faker.lorem.word()];
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
		survey.visibility = 'public';
		survey.typeOfVote = 'label';
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
		candidate.title = faker.lorem.words(4);
		candidate.surveyId = idS;
		candidate.description = faker.lorem.paragraph();
		candidate.longDescription = faker.lorem.paragraphs(6);
		candidate.noteMax = 5;
		candidate.score = faker.random.number({min: 0, max: 5, precision: 0.01});
		candidate.images = faker.image.image();
		candidate.opinions = [
			{label: 'rejeter', id: 'rejected', color: '#e8554e'},
			{label: 'mauvais', id: 'bad', color: '#f19c65'},
			{label: 'neutre', id: 'neutral', color: '#ffd265'},
			{label: 'bien', id: 'good', color: '#2aa876'},
			{label: 'excellent', id: 'excellent', color: '#0a7b83'},];
		candidate.modified = new Date();
		candidate.created = new Date();
		return candidate;
	}

	public static createFakeOneDayStat() {
		const reject: number = faker.random.number(10000);
		const good: number = faker.random.number(10000);
		const bad: number = faker.random.number(10000);
		const neutral: number = faker.random.number(10000);
		const excellent: number = faker.random.number(10000);


		const total: number = reject + good + bad + neutral + excellent;
		const pR: number = Number(((reject / total) * 100).toFixed(2));
		const pG: number = Number(((good / total) * 100).toFixed(2));
		const pB: number = Number(((bad / total) * 100).toFixed(2));
		const pN: number = Number(((neutral / total) * 100).toFixed(2));
		const pE: number = Number(((excellent / total) * 100).toFixed(2));
		const moy: number = Number(((excellent * 5 + good * 4 + neutral * 3 + bad * 2 + reject) / total).toFixed(2));
		return [pE, pG, pN, pB, pR, moy];
	}
}
