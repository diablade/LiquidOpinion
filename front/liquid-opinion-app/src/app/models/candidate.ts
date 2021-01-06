import {Opinion} from './survey';

export class Candidate {
  id: string;
  title: string;
  surveyId: string;
  description: string;
  longDescription: string;
  votes: Vote[];
  noteMax: number;
  images: string;
  modified: Date;
  created: Date;
  opinions: Opinion[];
  score: number;
  graphOpened: boolean;
}

export class Vote {
  // hashUserId: string;
  note: number;
  noteMax: number;
  date: Date;
}
