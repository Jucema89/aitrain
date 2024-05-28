import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { CreateTrainingComponent } from './create-training/create-training.component';
import { ConfigurationComponent } from './configuration/configuration.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'trainings',
        component: TrainingsComponent
    },
    {
        path: 'create',
        component: CreateTrainingComponent
    },
    {
        path: 'configuration',
        component: ConfigurationComponent
    },
    {
        path: '**',
        component: HomeComponent,
    }
];
