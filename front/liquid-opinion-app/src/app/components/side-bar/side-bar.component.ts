import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {
  faHeart, faAward, faUserFriends, faCog, faPoll, faVoteYea,
  faGlobeEurope, faPlus, faTrash, faBullhorn
} from '@fortawesome/free-solid-svg-icons';
import {User} from '../../models/user';
import {FakeData} from '../../utils/fake.data';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnChanges {
  faPoll = faPoll;
  faVoteYea = faVoteYea;
  faeuro = faGlobeEurope;
  faPlus = faPlus;
  faTrash = faTrash;
  faHeart = faHeart;
  faCog = faCog;
  faShare = faUserFriends;
  faAward = faAward;
  faHorn = faBullhorn;
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
