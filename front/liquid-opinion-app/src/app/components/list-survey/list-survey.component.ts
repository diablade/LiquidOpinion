import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../../services/survey.service';
import {Survey} from '../../models/survey';
import {Subscription} from 'rxjs';
import {faHeart, faShareAlt} from '@fortawesome/free-solid-svg-icons';

// import * as moment from 'moment';

@Component({
	selector: 'app-list-survey',
	templateUrl: './list-survey.component.html',
	styleUrls: ['./list-survey.component.scss']
})
export class ListSurveyComponent implements OnInit {
	surveys: any = [];

	subSurvey: Subscription;
	faShare = faShareAlt;
	faLike = faHeart;

	constructor(private surveyService: SurveyService) {

	}

	ngOnInit(): void {
		this.loadSurveys();
	}

	// Get survey list
	loadSurveys() {
		return this.surveyService.getSurveys('public')
			.subscribe(
				data => {
					this.surveys = data;
				},
				// error => {
				// 	console.log(error);
				// }
			);
	}

	onClick(share: string) {

	}
}
