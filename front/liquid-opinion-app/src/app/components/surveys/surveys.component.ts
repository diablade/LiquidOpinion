import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../../services/survey.service';
import {Survey} from '../../models/survey';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {
  private surveys: Survey[] = [];

  subSurvey: Subscription;

  constructor(private surveyService: SurveyService) {

  }

  ngOnInit(): void {
    // this.subSurvey = this.surveyService.getPublicSurveys.subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     this.surveys
      // }
    // );
  }

}
