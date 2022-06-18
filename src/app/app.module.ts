import { ChatEffects } from './store/chat/chat.effects';
import { environment } from './../environments/environment';
import { SocketService } from './services/util/socket.service';
import { UIEffects } from './store/ui/ui.effects';
import { AuthEffects } from './store/auth/auth.effects';
import { AppReducer } from './store/app.store';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MyErrorHandler } from './services/util/ErrorHandler';
import { HttpErrorInterceptor } from './services/util/http-interceptors';
import {ToastModule} from 'primeng/toast';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = { url: environment.socket, options: {} };

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
    BadgeModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot([AuthEffects,UIEffects,ChatEffects])
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
    MessageService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
