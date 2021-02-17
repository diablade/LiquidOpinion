import {Component, OnInit} from '@angular/core';
import {
	AbstractControl,
	AbstractControlOptions,
	FormBuilder,
	FormGroup,
	ValidationErrors,
	Validators
} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {first} from 'rxjs/operators';

import {ActivatedRoute, Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackbarService} from '../../services/snackbar.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	regexUsername = '^[a-zA-Z0-9]{4,}$';
	regexPass = '^[a-zA-Z0-9]{8,}$';
	bestRegexPass = '^[a-zA-Z0-9!"#\\$%&\'\\(\\)\\*\\+,-\\.\\/:;<=>\\?@[\\]\\^_`\\{\\|}~]{8,}$';
	hide = true;
	isSubmitted = false;
	currentUrl: string;
	formLogin: FormGroup;
	formReg: FormGroup;
	errorCredential = false;
	loading = false;

	constructor(private authService: AuthService, private dialogRef: MatDialogRef<LoginComponent>,
				private snackbar: MatSnackBar,
				private snackBarService: SnackbarService,
				private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
		this.initForms();
	}

	matchValues(controlName: string, matchingControlName: string): ValidationErrors | null {
		return (controls: AbstractControl) => {
			const control = controls.get(controlName);
			const matchingControl = controls.get(matchingControlName);
			if (control.value !== matchingControl.value) {
				return matchingControl.setErrors({noMatch: true});
			} else {
				return matchingControl.setErrors(null);
			}
		};
	}

	ngOnInit(): void {
		// get return url from route parameters or default to '/'
		this.currentUrl = this.route.snapshot.url.toString() || '/';
	}

	register() {
		this.isSubmitted = true;
		if (this.formReg.invalid) {
			return;
		}
		this.authService
			.register(this.formReg.get('emailReg').value, this.formReg.get('usernameReg').value, this.formReg.get('passwordReg').value)
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
		this.loading = true;
		if (this.formLogin.invalid) {
			this.loading = false;
			return;
		}
		this.authService.login(this.formLogin.get('email').value, this.formLogin.get('password').value)
			.pipe(first())
			.subscribe({
				next: () => {
					// this.router.navigate([this.currentUrl]);
					this.snackBarService.showSuccess('connexion réussi !');
					this.dialogRef.close(true);
					this.loading = false;
				},
				error: error => {
					this.snackBarService.showError('Invalid email or password');
					if (error?.error.message === 'Invalid credential') {
						this.errorCredential = true;
					}
					this.loading = false;
				}
			});
	}

	private initForms() {
		this.formLogin = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: [''],
		});

		this.formReg = this.fb.group({
			emailReg: ['', [Validators.required, Validators.email]],
			usernameReg: ['', [Validators.required, Validators.pattern(this.regexUsername)]],
			passwordReg: ['', [Validators.required, Validators.pattern(this.regexPass)]],
			passwordRegConfirm: ['', [Validators.required]],
		}, {
			validator: this.matchValues('passwordReg', 'passwordRegConfirm')
		} as AbstractControlOptions);
	}

}
