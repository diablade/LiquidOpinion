import {Component, OnInit} from '@angular/core';
import {faVoteYea} from '@fortawesome/free-solid-svg-icons';
import {ColorStyle} from '../../utils/colorStyle';
import {DisqusComment, DisqusReady} from 'ngx-disqus';
import {FakeData} from '../../utils/fake.data';


@Component({
	selector: 'app-candidate',
	templateUrl: './candidate.component.html',
	styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
	faVoteYea = faVoteYea;
	candidate: any;
	pageId: any;
	url: any;
	catId: any;

	constructor() {
		this.candidate = FakeData.createFakeCandidate('1', '1');
	}

	ngOnInit(): void {
	}

	getColorFromScore(score: any) {
		return ColorStyle.getColorFromScore(score, this.candidate.opinions);
	}

	onComment($event: DisqusComment) {

	}

	onReady($event: DisqusReady) {

	}

	onPaginate($event: any) {

	}
}
