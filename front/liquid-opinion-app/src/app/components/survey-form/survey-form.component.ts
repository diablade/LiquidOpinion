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
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackbarService} from '../../services/snackbar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
	selector: 'app-survey-form',
	templateUrl: './survey-form.component.html',
	styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {
	regexTitle = '^[a-zA-Z 0-9]*$';
	regexDescr = '^[a-zA-Z 0-9]*$';
	// regexUsername = '^[a-zA-Z0-9]{4,}$';
	// regexPass = '^[a-zA-Z0-9]{8,}$';
	// bestRegexPass = '^[a-zA-Z0-9!"#\\$%&\'\\(\\)\\*\\+,-\\.\\/:;<=>\\?@[\\]\\^_`\\{\\|}~]{8,}$';
	// hide = true;
	isSubmitted = false;
	formSurvey: FormGroup;
	errorCredential = false;
	loading = false;
	visible = true;
	selectable = true;
	removable = true;
	addOnBlur = true;
	readonly separatorKeysCodes: number[] = [ENTER, COMMA];
	tags: string[] = [];
	themeList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

	constructor(private authService: AuthService, private dialogRef: MatDialogRef<SurveyFormComponent>,
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
	}

	submit() {

	}

	add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		// Add our fruit
		if ((value || '').trim()) {
			this.tags.push(value.trim());
		}

		// Reset the input value
		if (input) {
			input.value = '';
		}
	}

	remove(tag: string): void {
		const index = this.tags.indexOf(tag);

		if (index >= 0) {
			this.tags.splice(index, 1);
		}
	}

	private initForms() {
		this.formSurvey = this.fb.group({
			titre: ['', [Validators.required, Validators.pattern(this.regexTitle), Validators.maxLength(70)]],
			descr: ['', [Validators.required, Validators.pattern(this.regexDescr), Validators.maxLength(500)]],
			slogan: ['', [Validators.required, Validators.pattern(this.regexDescr), Validators.maxLength(200)]],
			themes: [[''], [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
			tags: [[''], [Validators.required, Validators.maxLength(10)]],
		});
	}

}
