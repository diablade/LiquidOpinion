import {Component, OnInit} from '@angular/core';
import {Survey} from '../../models/survey';
import {Candidate, Vote} from '../../models/candidate';
import {faVoteYea} from '@fortawesome/free-solid-svg-icons';
import {FakeData} from '../../../assets/fake.data';
import * as faker from 'faker';
import * as _ from 'lodash';
import {ColorStyle} from '../../utils/colorStyle';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  surveyy: Survey;
  survey: Survey = FakeData.createFakeSurvey('1');
  candidates: Candidate[];
  faVoteYea = faVoteYea;
  choice: any;
  score: number;

  constructor() {
  }

  ngOnInit(): void {
    this.candidates = [FakeData.createFakeCandidate('1', this.survey.id),
      FakeData.createFakeCandidate('2', this.survey.id),
      FakeData.createFakeCandidate('3', this.survey.id),
      FakeData.createFakeCandidate('4', this.survey.id),
      FakeData.createFakeCandidate('5', this.survey.id)];
  }

  onClick(action: string) {

  }

  showAllGraph() {
    this.candidates.forEach(cand => cand.graphOpened = true);
  }

  getColorFromScore(score: number) {
    return ColorStyle.getColorFromScore(score, this.survey.opinionsDefault);
  }
}
