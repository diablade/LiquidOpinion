import {Component, OnInit} from '@angular/core';
import {Survey} from '../../models/survey';
import {Candidate} from '../../models/candidate';
import {FakeData} from '../../utils/fake.data';
import {ColorStyle} from '../../utils/colorStyle';
import {MatDialog} from '@angular/material/dialog';
import {ChartDialogComponent} from '../dialogs/chart-dialog/chart-dialog.component';


@Component({
	selector: 'app-survey',
	templateUrl: './survey.component.html',
	styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
	survey: Survey = FakeData.createFakeSurvey('1');
	candidates: Candidate[];
	score: number;

	constructor(public dialog: MatDialog) {
	}

	ngOnInit(): void {
		let fk2 = FakeData.createFakeCandidate('2', this.survey.id);
		fk2.opinions = [
			{label: 'mauvais', id: 'bad', color: '#f19c65'},
			{label: 'neutre', id: 'neutral', color: '#ffd265'},
			{label: 'bien', id: 'good', color: '#2aa876'},];
		this.candidates = [FakeData.createFakeCandidate('1', this.survey.id),
			fk2,
			FakeData.createFakeCandidate('3', this.survey.id),
			FakeData.createFakeCandidate('4', this.survey.id),
			FakeData.createFakeCandidate('5', this.survey.id),
			FakeData.createFakeCandidate('6', this.survey.id),
			FakeData.createFakeCandidate('7', this.survey.id),
			FakeData.createFakeCandidate('8', this.survey.id),
			FakeData.createFakeCandidate('9', this.survey.id),
			FakeData.createFakeCandidate('10', this.survey.id),
			FakeData.createFakeCandidate('11', this.survey.id),
			FakeData.createFakeCandidate('12', this.survey.id)];
	}

	showAllGraph() {
		this.candidates.forEach(cand => cand.graphOpened = true);
	}

	getColorFromScore(score: number) {
		return ColorStyle.getColorFromScore(score, this.survey.opinionsDefault);
	}

	onClick(share: string) {

	}

	showDialogGraph() {
		this.dialog.open(ChartDialogComponent);
	}
}
