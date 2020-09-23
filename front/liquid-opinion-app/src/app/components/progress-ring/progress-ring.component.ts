import {Component, Input, OnInit} from '@angular/core';
import {ProgressRingService} from '../../services/progress-ring.service';

@Component({
	selector: 'app-progress-ring',
	templateUrl: './progress-ring.component.html',
	styleUrls: ['./progress-ring.component.scss']
})
export class ProgressRingComponent implements OnInit {

	@Input() display: boolean = false;


	constructor(private progressRingService: ProgressRingService) {
	}

	ngOnInit() {
		this.progressRingService.toggleProgressRing.subscribe(
			display => this.display = display
		);
	}

}
