import {Component, Input, OnInit} from '@angular/core';
import {Opinion} from '../../models/survey';

@Component({
	selector: 'app-vote',
	templateUrl: './vote.component.html',
	styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
	@Input() opinions: Opinion[];
	@Input() candidateId: string;
	choice: Opinion;

	constructor() {
	}

	ngOnInit(): void {
	}

	onClick(vote: string): void{

	}
}
