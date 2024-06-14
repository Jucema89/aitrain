import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TrainingsDocsComponent } from './pages/trainings-docs/trainings-docs.component';
import { CreateTrainingDocsComponent } from './pages/create-training-docs/create-training-docs.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { CreateTrainingAIComponent } from './pages/create-training-AI/create-training-ai.component';
import { TrainingsAIComponent } from './pages/trainings-AI/trainings-ai.component';
import { ChatComponent } from './shared/components/chat/chat.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'docs',
        children: [
            {
                path: 'list',
                component: TrainingsDocsComponent,
            },
            {
                path: 'create',
                component: CreateTrainingDocsComponent,
            }
        ]
    },
    {
        path: 'training',
        children: [
            {
                path: 'list',
                component: TrainingsAIComponent,
            },
            {
                path: 'create',
                component: CreateTrainingAIComponent,
            }
        ]
    },
    {
        path: 'chat',
        component: ChatComponent
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
