import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {SideBarComponent} from './components/side-bar/side-bar.component';
import {ListSurveyComponent} from './components/list-survey/list-survey.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NotfoundComponent} from './components/notfound/notfound.component';
import {CandidateComponent} from './components/candidate/candidate.component';
import {SurveyComponent} from './components/survey/survey.component';
import {ProgressRingComponent} from './components/progress-ring/progress-ring.component';
import {ChartCandidateComponent} from './components/chart-candidate/chart-candidate.component';
import {ChartDialogComponent} from './components/dialogs/chart-dialog/chart-dialog.component';
import {LoginComponent} from './components/login/login.component';
import {SnackbarComponent} from './components/snackbar/snackbar.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {DisqusModule} from 'ngx-disqus';
import {VoteComponent} from './components/vote/vote.component';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
	declarations: [
		AppComponent,
		TopBarComponent,
		TopBarComponent,
		SideBarComponent,
		DashboardComponent,
		ListSurveyComponent,
		NotfoundComponent,
		CandidateComponent,
		SurveyComponent,
		ProgressRingComponent,
		ChartCandidateComponent,
		VoteComponent,
		ChartDialogComponent,
		LoginComponent,
		SnackbarComponent,
	],
	imports: [
		HttpClientModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatCardModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatSidenavModule,
		MatRadioModule,
		MatDividerModule,
		// MatTooltipModule,
		MatDialogModule,
		MatTabsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSnackBarModule,

		FontAwesomeModule,
		ChartsModule,
		FormsModule,
		DisqusModule.forRoot('liquidopinion'),
		ReactiveFormsModule,
	],
	providers: [],
	// entryComponents: [SnackbarComponent],
	bootstrap: [AppComponent]
})
export class AppModule {
}
