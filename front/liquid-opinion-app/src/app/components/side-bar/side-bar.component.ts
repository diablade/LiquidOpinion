import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
	faAward,
	faBullhorn,
	faCog,
	faGlobeEurope,
	faHeart,
	faPlus,
	faPoll,
	faTrash,
	faUserFriends,
	faVoteYea
} from '@fortawesome/free-solid-svg-icons';
import {User} from '../../models/user';
import {LoginComponent} from '../login/login.component';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {SnackbarService} from '../../services/snackbar.service';
import {SurveyFormComponent} from "../survey-form/survey-form.component";

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

	constructor(public dialog: MatDialog, private snackbarService: SnackbarService,
				private authService: AuthService, private userService: UserService) {

	}

	ngOnChanges(changes: SimpleChanges): void {
	}

	ngOnInit(): void {
		this.userService.userSubject.subscribe(user => {
			this.user = user;
		});
	}

	createSurvey() {
		const dialogRef = this.dialog.open(SurveyFormComponent);

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				console.log("test");
			}
		});

	}

	logout() {
		this.userConnected = false;
		this.authService.logout();
	}

	settings() {
	}

	openLogin() {
		const dialogRef = this.dialog.open(LoginComponent);

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.userConnected = true;
			}
		});
	}
}
