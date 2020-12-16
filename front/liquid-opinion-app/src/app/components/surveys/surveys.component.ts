import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../../services/survey.service';
import {Image, Member, Survey} from '../../models/survey';
import {Subscription} from 'rxjs';
import {faShareAlt, faHeart} from '@fortawesome/free-solid-svg-icons';

// import * as moment from 'moment';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {
  surveys: Survey[] = [];

  subSurvey: Subscription;
  faShare = faShareAlt;
  faLike = faHeart;

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
      candidatesIds: ['id1', 'id2'],
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
    }, {
      id: 'id survey2',
      title: 'title2',
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
      id: 'id survey3',
      title: 'title3',
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

  onClick(share: string) {

  }
}
