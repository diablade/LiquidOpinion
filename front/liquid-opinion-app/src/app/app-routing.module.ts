import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SurveysComponent} from './components/surveys/surveys.component';
import {NotfoundComponent} from './components/notfound/notfound.component';
import {SurveyComponent} from './components/survey/survey.component';
import {CandidateComponent} from './components/candidate/candidate.component';

const routes: Routes = [
  // {path: '', component: DashboardComponent},
  {path: '', component: SurveysComponent},
  {path: 'surveys-favorites', component: SurveysComponent},
  {path: 'surveys-participate', component: SurveysComponent},
  {path: 'surveys-public', component: SurveysComponent},
  {path: 'survey/:slug', component: SurveyComponent},
  {path: 'survey/:slug/candidate/:id', component: CandidateComponent},
  {path: 'not-found', component: NotfoundComponent},
  {path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
