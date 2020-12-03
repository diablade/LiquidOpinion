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
      title: 'candidat 1 de ouffff ouf ouf',
      creator: {id: 'id user', username: 'user name'},
      description: 'description qui est vraiment pas long du tout v' +
        'oir pas du tout tout toutoutoutoutou ze zgrgrgzr zgdbdder z' +
        'oir pas du tout tout toutoutoutoutou ze zgrgrgzr zgdbdder z' +
        'oir pas du tout tout toutoutoutoutou ze zgrgrgzr zgdbdder z' +
        'oir pas du tout tout toutoutoutoutou ze zgrgrgzr zgdbdder z' +
        'zeze zrze ze zrg ze oljkzefoil zerzeolirjnze zesoil kznefilzen ez lzekjrf',
      theme: 'string',
      tags: ['tag', 'tag2'],
      members: [{id: 'id user1', username: 'user1'}, {id: 'id user2', username: 'user2'}],
      editors: [{id: 'id user1', username: 'user1'}, {id: 'id user2', username: 'user2'}],
      admins: [{id: 'id user1', username: 'user1'}, {id: 'id user2', username: 'user2'}],
      candidatesIds: ['id1', 'id2'],
      images: 'https://tse1.mm.bing.net/th?id=OIP.hsTpX1PPF8MnKpugSWJGVQHaHa&pid=Api',
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
      images: 'https://tse3.mm.bing.net/th?id=OIP._7Fk7RukccwyRphGJvZdhgHaHa&pid=Api',
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
      description: 'description decreaczpznrpi ijz epij piln,pipij pij,pmj p ij pzepejfzepij pizej,pmj knlknlk:n;, pomjpmj, . pimkj, ',
      theme: 'string',
      tags: ['tag', 'tag2'],
      members: [{id: 'id user2', username: 'user2'}, {id: 'id user3', username: 'user3'}],
      editors: [{id: 'id user1', username: 'user1'}, {id: 'id user2', username: 'user2'}],
      admins: [{id: 'id user1', username: 'user1'}, {id: 'id user2', username: 'user2'}],
      candidatesIds: ['id1', 'id2'],
      images: 'https://tse3.mm.bing.net/th?id=OIP._7Fk7RukccwyRphGJvZdhgHaHa&pid=Api',
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
      images: 'https://tse3.mm.bing.net/th?id=OIP._7Fk7RukccwyRphGJvZdhgHaHa&pid=Api',
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
      images: 'https://tse3.mm.bing.net/th?id=OIP._7Fk7RukccwyRphGJvZdhgHaHa&pid=Api',
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
      images: 'https://tse3.mm.bing.net/th?id=OIP._7Fk7RukccwyRphGJvZdhgHaHa&pid=Api',
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
      images: 'https://tse3.mm.bing.net/th?id=OIP._7Fk7RukccwyRphGJvZdhgHaHa&pid=Api',
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
      images: 'https://tse3.mm.bing.net/th?id=OIP._7Fk7RukccwyRphGJvZdhgHaHa&pid=Api',
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
