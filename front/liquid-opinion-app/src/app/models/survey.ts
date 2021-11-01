export class Survey {
	id: string;
	title: string;
	slug: string;
	creator: Member;
	slogan: string;
	description: string;
	themes: string[];
	tags: string[];
	members: Member[];
	editors: Member[];
	admins: Member[];
	candidatesIds: string[];
	images: Image[];
	activate: boolean;
	visibility: string;
	typeOfVote: string; // unified or custom for each candidate
	opinionsDefault: Opinion[] = [
		{label: 'rejeter', id: 'rejected', color: '#e8554e'},
		{label: 'mauvais', id: 'bad', color: '#f19c65'},
		{label: 'neutre', id: 'neutral', color: '#ffd265'},
		{label: 'bien', id: 'good', color: '#2aa876'},
		{label: 'excellent', id: 'excellent', color: '#0a7b83'},];
	reVoteDelay: string;
	expireAt: Date;
	selfDestruct: Date;
	modified: Date;
	created: Date;
}

export class Member {
	id: string;
	username: string;
	photo: string; // url small photo
}

export class Image {
	format: string;
	url: string;
}

export class Opinion {
	label: string;
	color: string;
	id: string;
}
