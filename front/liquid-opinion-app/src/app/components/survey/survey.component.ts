import {Component, OnInit} from '@angular/core';
import {Survey} from "../../models/survey";
import {Vote} from "../../models/candidate";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  candidates: any;
  survey: Survey;

  constructor() {
  }

  ngOnInit(): void {
    this.survey = {
      id: 'id survey1',
      title: 'sondage 1 de ouffff ouf ouf',
      creator: {
        id: 'id user',
        username: 'user name',
        photo: 'https://tse1.mm.bing.net/th?id=OIP.o_BpuBv1QSN1S0kMWQjZawHaHa&pid=Api'
      },
      slogan: 'mon petit slogan un peu long ggggggggg par cequerfz ouefzeiun zfer vuibnezfze ',
      description: 'description qui est vraiment pas long du tout v' +
        'oir pas du tout tout toutoutoutoutou ze zgrgrgzr zgdbdder z' +
        'oir pas du tout tout toutoutoutoutou ze zgrgrgzr zgdbdder z' +
        'oir pas du tout tout toutoutoutoutou ze zgrgrgzr zgdbdder z' +
        'oir pas du tout tout toutoutoutoutou ze zgrgrgzr zgdbdder z' +
        'zeze zrze ze zrg ze oljkzefoil zerzeolirjnze zesoil kznefilzen ez lzekjrf',
      theme: 'string',
      tags: ['tag', 'tag2'],
      members: [{
        id: 'id user1', username: 'user1',
        photo: 'https://tse1.mm.bing.net/th?id=OIP.o_BpuBv1QSN1S0kMWQjZawHaHa&pid=Api'
      }, {
        id: 'id user2', username: 'user2',
        photo: 'https://tse1.mm.bing.net/th?id=OIP.o_BpuBv1QSN1S0kMWQjZawHaHa&pid=Api'
      }],
      editors: [{
        id: 'id user1', username: 'user1',
        photo: 'https://tse1.mm.bing.net/th?id=OIP.o_BpuBv1QSN1S0kMWQjZawHaHa&pid=Api'
      }, {
        id: 'id user2', username: 'user2',
        photo: 'https://tse1.mm.bing.net/th?id=OIP.o_BpuBv1QSN1S0kMWQjZawHaHa&pid=Api'
      }],
      admins: [{
        id: 'id user1', username: 'user1',
        photo: 'https://tse1.mm.bing.net/th?id=OIP.o_BpuBv1QSN1S0kMWQjZawHaHa&pid=Api'
      }, {
        id: 'id user2', username: 'user2',
        photo: 'https://tse1.mm.bing.net/th?id=OIP.o_BpuBv1QSN1S0kMWQjZawHaHa&pid=Api'
      }],
      candidatesIds: ['candidateId1', 'candidateId2'],
      images: 'https://tse4.mm.bing.net/th?id=OIP.qE8HSmTXq_mPe8_Tx3c7OAHaEK&pid=Api',
      activate: true,
      visibleBySearch: true,
      isPrivate: false,
      typeOfVote: 'note',
      noteLabels: [],
      reVoteDelay: 'string',
      expireAt: null,
      selfDestruct: null,
      modified: null,
      created: new Date(),
    };

    this.candidates = [{
      id: 'candidateId1',
      title: 'premier candidat',
      surveyId: 'survey1',
      description: 'description du premier candidat  ',
      votes: [
        {note: 5, noteMax: 5, date: new Date()},
        {note: 4, noteMax: 5, date: new Date()},
        {note: 4, noteMax: 5, date: new Date()},
        {note: 3, noteMax: 5, date: new Date()},
        {note: 1, noteMax: 5, date: new Date()},
        {note: 2, noteMax: 5, date: new Date()},
        {note: 5, noteMax: 5, date: new Date()}],
      noteMax: 5,
      images: 'https://tse1.mm.bing.net/th?id=OIP.o_BpuBv1QSN1S0kMWQjZawHaHa&pid=Api',
      modified: new Date(),
      created: new Date(),
    },{
      id: 'candidateId2',
      title: 'second candidat',
      surveyId: 'survey1',
      description: 'description du second candidat  ',
      votes: [
        {note: 5, noteMax: 5, date: new Date()},
        {note: 5, noteMax: 5, date: new Date()},
        {note: 5, noteMax: 5, date: new Date()},
        {note: 4, noteMax: 5, date: new Date()},
        {note: 4, noteMax: 5, date: new Date()},
        {note: 2, noteMax: 5, date: new Date()},
        {note: 1, noteMax: 5, date: new Date()}],
      noteMax: 5,
      images: 'https://tse1.mm.bing.net/th?id=OIP.o_BpuBv1QSN1S0kMWQjZawHaHa&pid=Api',
      modified: new Date(),
      created: new Date(),
    },{
      id: 'candidateId3',
      title: '3em candidat',
      surveyId: 'survey1',
      description: 'description du troisieme candidat  ',
      votes: [
        {note: 5, noteMax: 5, date: new Date()},
        {note: 5, noteMax: 5, date: new Date()},
        {note: 5, noteMax: 5, date: new Date()},
        {note: 4, noteMax: 5, date: new Date()},
        {note: 4, noteMax: 5, date: new Date()},
        {note: 2, noteMax: 5, date: new Date()},
        {note: 1, noteMax: 5, date: new Date()}],
      noteMax: 5,
      images: 'https://tse1.mm.bing.net/th?id=OIP.o_BpuBv1QSN1S0kMWQjZawHaHa&pid=Api',
      modified: new Date(),
      created: new Date(),
    }];
  }

}
