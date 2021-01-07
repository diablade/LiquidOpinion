import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {faAward, faBullhorn, faCog, faGlobeEurope, faHeart, faPlus, faPoll, faTrash, faUserFriends, faVoteYea} from '@fortawesome/free-solid-svg-icons';
import {User} from '../../models/user';
import {FakeData} from '../../utils/fake.data';
import {LoginDialogComponent} from "../dialogs/login-dialog/login-dialog.component";
import {MatDialog} from "@angular/material/dialog";

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
    userConnected = false;

    constructor(public dialog: MatDialog) {
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

    login() {
        this.dialog.open(LoginDialogComponent);
    }
}
