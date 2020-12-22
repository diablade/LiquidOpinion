import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {MatCardModule} from '@angular/material/card';
import {SideBarComponent} from './components/side-bar/side-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SurveysComponent} from './components/surveys/surveys.component';
import {NotfoundComponent} from './components/notfound/notfound.component';
import {CandidateComponent} from './components/candidate/candidate.component';
import {SurveyComponent} from './components/survey/survey.component';
import {MatIconModule} from '@angular/material/icon';
import {ProgressRingComponent} from './components/progress-ring/progress-ring.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import { ChartCandidateComponent } from './components/chart-candidate/chart-candidate.component';
// import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    TopBarComponent,
    SideBarComponent,
    DashboardComponent,
    SurveysComponent,
    NotfoundComponent,
    CandidateComponent,
    SurveyComponent,
    ProgressRingComponent,
    ChartCandidateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatRadioModule,
    FontAwesomeModule,
    ChartsModule,
    FormsModule,
    // MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
