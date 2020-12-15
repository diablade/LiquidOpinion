import {Component, Input, OnInit} from '@angular/core';
import {ProgressRingService} from "../../services/progress-ring.service";

@Component({
  selector: 'app-progress-ring',
  templateUrl: './progress-ring.component.html',
  styleUrls: ['./progress-ring.component.scss']
})
export class ProgressRingComponent implements OnInit {

  @Input() show: boolean = false;

  constructor(private progressRingService: ProgressRingService) {
  }


  ngOnInit(): void {
    this.progressRingService.toggleProgressRing.subscribe(show => this.show = show);
  }

}
