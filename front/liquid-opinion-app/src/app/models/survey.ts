export class Survey {
  id: string;
  title: string;
  creator: Member;
  slogan: string;
  description: string;
  theme: string;
  tags: string[];
  members: Member[];
  editors: Member[];
  admins: Member[];
  candidatesIds: string[];
  images: Image[];
  activate: boolean;
  visibleBySearch: boolean;
  isPrivate: boolean;
  typeOfVote: string;
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
  photo: string; // url
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
