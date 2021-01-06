import {Component, Input, OnInit} from '@angular/core';
import {Opinion} from '../../models/survey';
import {faVoteYea} from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

@Component({
	selector: 'app-vote',
	templateUrl: './vote.component.html',
	styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
	@Input() opinions: Opinion[];
	@Input() candidateId: string;
	choice: Opinion;
	faVoteYea = faVoteYea;
	validated = false;
	nextTime = '1 jour';
	canVote = true;

	constructor() {
		// this.nextTime.asDays(); duration ????
	}

	ngOnInit(): void {
	}

	onClick(vote: string): void {

		if (vote === 'vote') {
			this.canVote = false;
			this.validated = true;
		}else if (vote === 'reset'){
			this.canVote = true;
			this.validated = false;
		}
	}
}
