import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideLoginComponent } from './components/side-login/side-login.component';
import { RecoveryComponent } from './components/recovery/recovery.component';

const routes: Routes = [
  {
    path: 'login',
    component: SideLoginComponent
  },
  {
    path: 'recovery',
    component: RecoveryComponent
  },
  {
    path: '**',
    component: SideLoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
