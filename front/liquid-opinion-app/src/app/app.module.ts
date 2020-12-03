import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
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

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    TopBarComponent,
    SideBarComponent,
    DashboardComponent,
    SurveysComponent,
    NotfoundComponent,
    CandidateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
