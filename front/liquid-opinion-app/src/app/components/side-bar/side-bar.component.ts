import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {faBriefcase, faPoll, faGlobeEurope, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnChanges {
  faBriefCase = faBriefcase;
  faPoll = faPoll;
  faeuro = faGlobeEurope;
  faPlus = faPlus;
  faTrash = faTrash;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  createSurvey() {

  }
}
