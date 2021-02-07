import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	hide: boolean;
	authFormRegister: FormGroup;
	authFormLogin: FormGroup;
	isSubmitted = false;
	regex = '^[a-zA-Z0-9]{8,}$';
	bestRegex = '^[a-zA-Z0-9!"#\\$%&\'\\(\\)\\*\\+,-\\.\\/:;<=>\\?@[\\]\\^_`\\{\\|}~]{8,}$';

	email = new FormControl('', [Validators.required, Validators.email]);
	password = new FormControl('', [Validators.required, Validators.pattern(this.regex)]);

	constructor(
		// private authService: AuthService, public location: Location, private router: Router, private formBuilder: FormBuilder
	) {
	}

	get formControls() {
		return this.authFormRegister.controls;
	}

	getErrorEmail() {
		if (this.email.hasError('required')) {
			return 'You must enter a value';
		}
		return this.email.hasError('email') ? 'Not a valid email' : '';
	}

	getErrorPassword() {
		if (this.email.hasError('required')) {
			return 'You must enter a value';
		}
		return this.email.hasError('email') ? 'password must be : min 8 Char, lowercase, uppercase letters and numbers' : '';
	}

	ngOnInit(): void {
		// this.authForm = this.formBuilder.group({
		// 	email: ['', Validators.required],
		// 	password: ['', Validators.required]
		// });
	}

	register() {
		// this.isSubmitted = true;
		// if (this.authForm.invalid) {
		// 	return;
		// }
		// this.authService.login(this.authForm.password,this.);
		// this.router.navigate(this.location.pathname);
		// window.location.reload();
	}
	login() {
		// this.isSubmitted = true;
		// if (this.authForm.invalid) {
		// 	return;
		// }
		// this.authService.login(this.authForm.password,this.);
		// this.router.navigate(this.location.pathname);
		// window.location.reload();
	}
}
