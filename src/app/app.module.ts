import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

import {CardModule} from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import { ChatBoxComponent } from './pages/chat-box/chat-box.component';
import {AvatarModule} from 'primeng/avatar';
import {RippleModule} from 'primeng/ripple';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {MenuModule} from 'primeng/menu';
import {BadgeModule} from 'primeng/badge';
import {DialogModule} from 'primeng/dialog';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MyErrorHandler } from './services/util/ErrorHandler';
import { HttpErrorInterceptor } from './services/util/http-interceptors';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChatBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ToastModule,
    BrowserAnimationsModule,
    DialogModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    AvatarModule,
    ButtonModule,
    AutoCompleteModule,
    OverlayPanelModule,
    RippleModule,
    MenuModule,
    BadgeModule
  ],
  providers: [
    ConfirmationService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: MyErrorHandler,
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
