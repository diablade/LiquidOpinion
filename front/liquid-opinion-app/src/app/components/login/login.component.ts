import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {first} from 'rxjs/operators';

import {ActivatedRoute, Router} from '@angular/router';

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
	currentUrl: String;

	regexUsername = '^[a-zA-Z0-9]{4,}$';
	regexPass = '^[a-zA-Z0-9]{8,}$';
	bestRegexPass = '^[a-zA-Z0-9!"#\\$%&\'\\(\\)\\*\\+,-\\.\\/:;<=>\\?@[\\]\\^_`\\{\\|}~]{8,}$';

	constructor(private authService: AuthService,
				private route: ActivatedRoute,
				private router: Router, private fb: FormBuilder) {
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

	getErrorPseudo() {
		if (this.username.hasError('required')) {
			return 'You must enter a value';
		}
		return this.username.hasError('pseudo') ? 'only letters, numbers' : '';
	}

	ngOnInit(): void {
		// get return url from route parameters or default to '/'
		this.currentUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

		this.authFormRegister = this.fb.group({
			email: ['', Validators.required, Validators.email],
			username: ['', Validators.required, Validators.email],
			password: ['', Validators.required, Validators.pattern(this.regexPass)],
		});
		this.authFormLogin = this.fb.group({
			email: ['', Validators.required, Validators.email],
			password: ['', Validators.required, Validators.pattern(this.regexPass)]
		});
	}

	register() {
		this.isSubmitted = true;
		if (this.authFormRegister.invalid) {
			return;
		}
		this.authService.login(this.authFormRegister.get('email'), this.authFormRegister.get('username'), this.authFormRegister.get('password'))
			.pipe()
			.subscribe({
				next: () => {
					this.router.navigate([this.currentUrl]);
				},
				error: error => {
					// this.error = error;
					// this.loading = false;
				}
			});
	}

	login() {
		this.isSubmitted = true;
		if (this.authForm.invalid) {
			return;
		}
		this.authService.login(this.authFormLogin.get('email'), this.authFormLogin.get('password'))
			.pipe(first())
			.subscribe({
				next: () => {
					this.router.navigate([this.currentUrl]);
				},
				error: error => {
					// this.error = error;
					// this.loading = false;
				}
			});
	}

}
