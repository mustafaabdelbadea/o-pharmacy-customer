import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { RequestResetComponent } from './request-reset/request-reset.component';
import { ResponseResetComponent } from './response-reset/response-reset.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { ReportProblemComponent } from './report-problem/report-problem.component';
import { HealthNewsComponent } from './health-news/health-news.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotVerifiedComponent } from './not-verified/not-verified.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RequestResetComponent,
    ResponseResetComponent,
    VerifyEmailComponent,
    SignupComponent,
    ReportProblemComponent,
    HealthNewsComponent,
    NotFoundComponent,
    NotVerifiedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
