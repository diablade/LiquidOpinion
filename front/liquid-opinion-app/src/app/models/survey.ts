export class Survey {
  id: string;
  title: string;
  creator: Member;
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
  noteLabels: string[];
  reVoteDelay: string;
  expireAt: Date;
  selfDestruct: Date;
  modified: Date;
  created: Date;
}

export class Member {
  id: string;
  username: string;
}

export class Image {
  format: string;
  url: string;
}
