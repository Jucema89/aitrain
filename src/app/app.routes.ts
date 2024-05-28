import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormTrainComponent } from './components/form-train/form-train.component';
import { TableTrainComponent } from './components/table-train/table-train.component';
import { HomeComponent } from './home/home.component';
import { TrainingsComponent } from './trainings/trainings.component';

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
        component: FormTrainComponent
    }
];
