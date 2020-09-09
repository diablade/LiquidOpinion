import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {faBriefcase, faPoll, faGlobeEurope} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnChanges {
  @Input() collapse: boolean = false;
  faBriefCase = faBriefcase;
  faPoll = faPoll;
  faeuro = faGlobeEurope;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

}
