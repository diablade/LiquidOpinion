import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../../services/survey.service';
import {Image, Member, Survey} from '../../models/survey';
import {Subscription} from 'rxjs';

// import * as moment from 'moment';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {
  surveys: Survey[] = [];

  subSurvey: Subscription;

  constructor(/*private surveyService: SurveyService*/) {

  }

  ngOnInit(): void {
    this.fakeData();
    // this.subSurvey = this.surveyService.getPublicSurveys.subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     this.surveys
    // }
    // );
  }

  fakeData(): void {
    this.surveys = [{
      id: 'id survey1',
      title: 'title1',
      creator: {id: 'id user', username: 'user name'},
      description: 'description',
      theme: 'string',
      tags: ['tag', 'tag2'],
      members: [{id: 'id user1', username: 'user1'}, {id: 'id user2', username: 'user2'}],
      editors: [{id: 'id user1', username: 'user1'}, {id: 'id user2', username: 'user2'}],
      admins: [{id: 'id user1', username: 'user1'}, {id: 'id user2', username: 'user2'}],
      candidatesIds: ['id1', 'id2'],
      images: [],
      activate: true,
      visibleBySearch: true,
      isPrivate: false,
      typeOfVote: 'note',
      noteLabels: [],
      reVoteDelay: 'string',
      expireAt: null,
      selfDestruct: null,
      modified: null,
      created: null,
    }, {
      id: 'id survey2',
      title: 'title2',
      creator: {id: 'id user', username: 'user name'},
      description: 'description',
      theme: 'string',
      tags: ['tag', 'tag2'],
      members: [{id: 'id user2', username: 'user2'}, {id: 'id user3', username: 'user3'}],
      editors: [{id: 'id user1', username: 'user1'}, {id: 'id user2', username: 'user2'}],
      admins: [{id: 'id user1', username: 'user1'}, {id: 'id user2', username: 'user2'}],
      candidatesIds: ['id1', 'id2'],
      images: [],
      activate: true,
      visibleBySearch: true,
      isPrivate: false,
      typeOfVote: 'note',
      noteLabels: [],
      reVoteDelay: 'string',
      expireAt: null,
      selfDestruct: null,
      modified: null,
      created: null,
    }
    ];
  }
}
