import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {faHeart, faCog, faPoll, faGlobeEurope, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {User} from '../../models/user';
import {FakeData} from '../../../assets/fake.data';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnChanges {
  faPoll = faPoll;
  faeuro = faGlobeEurope;
  faPlus = faPlus;
  faTrash = faTrash;
  faHeart = faHeart;
  faCog = faCog;
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
