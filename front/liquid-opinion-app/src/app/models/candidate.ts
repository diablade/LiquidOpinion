export class Candidate {
  id: string;
  title: string;
  surveyId: string;
  description: string;
  votes: Vote[];
  noteMax: number;
  images: string;
  modified: Date;
  created: Date;
  choice: any;
}

export class Vote {
  // hashUserId: string;
  note: number;
  noteMax: number;
  date: Date;
}
