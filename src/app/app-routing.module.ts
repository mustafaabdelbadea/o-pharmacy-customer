import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthLoginGuard } from './Guards/auth-login.guard';
import { AuthGuard } from './Guards/auth.guard';
import { VerifyGuard } from './Guards/verify.guard';
import { HealthNewsComponent } from './health-news/health-news.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderComponent } from './order/order.component';
import { ReportProblemComponent } from './report-problem/report-problem.component';
import { RequestResetComponent } from './request-reset/request-reset.component';
import { ResponseResetComponent } from './response-reset/response-reset.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { GetAllPharmaciesComponent } from './get-all-pharmacies/get-all-pharmacies.component';
import { CustomerCurrentOrdersComponent } from './customer-current-orders/customer-current-orders.component';
import { CustomerHistoryComponent } from './customer-history/customer-history.component';
import { GetMedicalHistoryComponent } from './get-medical-history/get-medical-history.component';
import { GetOneOrderComponent } from './get-one-order/get-one-order.component';
import { GetOnePharmacyComponent } from './get-one-pharmacy/get-one-pharmacy.component';

const routes: Routes = [
  {path:"",redirectTo:"signin",pathMatch:"full"},
  { path: 'signin', component: SigninComponent },
  { path: 'requestreset', component: RequestResetComponent },
  { path: 'signup', component: SignupComponent },
    //{ path: 'signin',canActivate:[AuthLoginGuard] , component: SigninComponent },
  //{ path: 'signup', canActivate:[AuthLoginGuard],component: SignupComponent },
  {path:'reportProblem',component:ReportProblemComponent},
  //{path:'healthNews',component:HealthNewsComponent},
//check if logged in and email verified 
  {path:'healthNews',canActivate:[AuthGuard,VerifyGuard],component:HealthNewsComponent},
  {path:'verifyAccount',canActivate:[AuthGuard],component:VerifyEmailComponent},
  {path:'editProfile',component:EditProfileComponent},
  {path:'makeOrder',canActivate:[AuthGuard,VerifyGuard],component:OrderComponent},
  {path:'orderHistory',component:OrderHistoryComponent},
  {path:'getAllPharmacies',component:GetAllPharmaciesComponent},
  {path:'customerCurrentOrders',component:CustomerCurrentOrdersComponent},
  {path:'customerHistory',component:CustomerHistoryComponent},
  {path:'getMedicalHistory',component:GetMedicalHistoryComponent},
  {path:'getOneOrder/:currentOrder',component:GetOneOrderComponent},
  {path:' GetOnePharmacy/:pharmacyID',component:GetOnePharmacyComponent},
  //take token from ts file and send it backend
  { path: 'customerForgotPassword/:token', component: ResponseResetComponent },
  { path: 'customerVerifyEmail/:token', component: VerifyEmailComponent },
  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
