import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ListSurveyComponent} from './components/list-survey/list-survey.component';
import {NotfoundComponent} from './components/notfound/notfound.component';
import {SurveyComponent} from './components/survey/survey.component';
import {CandidateComponent} from './components/candidate/candidate.component';

const routes: Routes = [
	// {path: '', component: DashboardComponent},
	{path: '', component: ListSurveyComponent},
	{path: 'event', component: ListSurveyComponent},
	{path: 'favorites', component: ListSurveyComponent},
	{path: 'created', component: ListSurveyComponent},
	{path: 'participate', component: ListSurveyComponent},
	{path: 'shared', component: ListSurveyComponent},
	{path: 'official', component: ListSurveyComponent},
	{path: 'public', component: ListSurveyComponent},
	{path: 'expired', component: ListSurveyComponent},
	{path: 'survey/:slug', component: SurveyComponent},
	{path: 'survey/:slug/candidate/:id', component: CandidateComponent},
	{path: 'not-found', component: NotfoundComponent},
	{path: '**', redirectTo: '/not-found'},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
