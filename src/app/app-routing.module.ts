import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestResetComponent } from './request-reset/request-reset.component';
import { ResponseResetComponent } from './response-reset/response-reset.component';
import {SigninComponent} from './signin/signin.component'
import { VerifyEmailComponent } from './verify-email/verify-email.component';
const routes: Routes = [
  {path:'signin',component:SigninComponent},
    {path:'requestreset',component:RequestResetComponent},
    {path:'pharmacyForgotPassword/:token',component:ResponseResetComponent},
    {path:'pharmacyVerifyEmail/:token',component:VerifyEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
