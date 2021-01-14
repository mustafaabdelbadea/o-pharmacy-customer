import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestResetComponent } from './request-reset/request-reset.component';
import { ResponseResetComponent } from './response-reset/response-reset.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'requestreset', component: RequestResetComponent },
  { path: 'signup', component: SignupComponent },

  //take token from ts file and send it backend
  { path: 'customerForgotPassword/:token', component: ResponseResetComponent },
  { path: 'customerVerifyEmail/:token', component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
