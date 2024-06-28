import { Routes } from '@angular/router';
import { TrainingsDocsComponent } from './pages/trainings-docs/trainings-docs.component';
import { CreateTrainingDocsComponent } from './pages/create-training-docs/create-training-docs.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { CreateTrainingAIComponent } from './pages/create-training-AI/create-training-ai.component';
import { TrainingsAIComponent } from './pages/trainings-AI/trainings-ai.component';
import { ChatComponent } from './shared/components/chat/chat.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthGuard } from './shared/guards/AuthGuard/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    },
   
    {
        path: '',
        component: LayoutComponent,
        // canActivate: [AuthGuard],
        // canLoad: [AuthGuard],
        children: [
            {
                path: 'home',
                loadChildren: () => import('./pages/stats/stats.module').then(m => m.StatsComponent),
            },
            {
                path: 'training',
                loadChildren: () => import('./pages/trainings-AI/trainings-ai.component').then(m => m.TrainingsAIComponent),
            },
            {
                path: 'documents',
                loadChildren: () => import('./pages/create-training-docs/create-training-docs.component').then(m => m.CreateTrainingDocsComponent),
            },
            {
                path: '**',
                redirectTo: 'home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    
    // {
    //     path: '',
    //     component: HomeComponent,
    // },
    // {
    //     path: 'docs',
    //     children: [
    //         {
    //             path: 'list',
    //             component: TrainingsDocsComponent,
    //         },
    //         {
    //             path: 'create',
    //             component: CreateTrainingDocsComponent,
    //         }
    //     ]
    // },
    // {
    //     path: 'training',
    //     children: [
    //         {
    //             path: 'list',
    //             component: TrainingsAIComponent,
    //         },
    //         {
    //             path: 'create',
    //             component: CreateTrainingAIComponent,
    //         }
    //     ]
    // },
    // {
    //     path: 'chat',
    //     component: ChatComponent
    // },
    // {
    //     path: 'configuration',
    //     component: ConfigurationComponent
    // },
    // {
    //     path: '**',
    //     component: HomeComponent,
    // }
];
