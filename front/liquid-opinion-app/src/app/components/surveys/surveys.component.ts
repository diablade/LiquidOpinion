import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../../services/survey.service';
import {Image, Member, Survey} from '../../models/survey';
import {Subscription} from 'rxjs';
import {faShareAlt, faHeart} from '@fortawesome/free-solid-svg-icons';
import {FakeData} from '../../../assets/fake.data';
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
    this.surveys = [FakeData.createFakeSurvey('1'),
      FakeData.createFakeSurvey('2'),
      FakeData.createFakeSurvey('3'),
      FakeData.createFakeSurvey('4'),
      FakeData.createFakeSurvey('5')];
    // this.subSurvey = this.surveyService.getPublicSurveys.subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     this.surveys
    // }
    // );
  }

  onClick(share: string) {

  }
}
