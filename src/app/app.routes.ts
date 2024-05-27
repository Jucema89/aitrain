import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormTrainComponent } from './components/form-train/form-train.component';
import { TableTrainComponent } from './components/table-train/table-train.component';

export const routes: Routes = [
    {
        path: '',
        component: TableTrainComponent,
    },
    {
        path: 'create',
        component: FormTrainComponent
    }
];
