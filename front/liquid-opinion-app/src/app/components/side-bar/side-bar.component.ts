import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {faBriefcase, faPoll, faGlobeEurope, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {User} from "../../models/user";
import {FakeData} from "../../../assets/fake.data";

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
  user: User;

  constructor() {
    this.user = FakeData.createFakeUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  createSurvey() {

  }

  onClick(logout: string) {

  }
}
