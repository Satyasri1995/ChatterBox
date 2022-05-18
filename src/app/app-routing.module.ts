import { ChatBoxComponent } from './pages/chat-box/chat-box.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {path:"",redirectTo:"ChatterBox/login",pathMatch:"full"},
  {path:"ChatterBox/login",component:LoginComponent},
  {path:"ChatterBox/signup",component:SignupComponent},
  {path:"ChatterBox/chatBox",component:ChatBoxComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
