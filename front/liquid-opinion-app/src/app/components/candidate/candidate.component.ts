import {Component, OnInit} from '@angular/core';
import {FakeData} from '../../../assets/fake.data';
import {ColorStyle} from "../../utils/colorStyle";

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
  candidate: any;

  constructor() {
    this.candidate = FakeData.createFakeCandidate('1', '1');
  }

  ngOnInit(): void {
  }

  getColorFromScore(score: any) {
    ColorStyle.getColorFromScore(score,this.candidateopinionsDefault);
  }
}
