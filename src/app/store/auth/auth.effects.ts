
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthLogin, AuthLoginRest, AuthSignUpRest } from './auth.actions';
import { environment } from 'src/environments/environment';
import { Toast } from 'src/app/Models/Toast';
import { RedirectToPage, ShowToast } from '../ui/ui.actions';
import { RouterState } from '@angular/router';


@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  authLoginRest = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthLoginRest),
      switchMap((payload) =>
        this.http
          .post(environment.api + '/auth/login', {
            mail: payload.mail,
            password: payload.password,
          })
          .pipe(
            mergeMap((response: any) => {
              let toast=new Toast(response);
              toast.show=!response.data.isLoggedIn;
              return [
                AuthLogin({ auth: response.data }),
                ShowToast({ toast: toast }),
              ];
            })
          )
      )
    );
  });

  authSignUpRest = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthSignUpRest),
      switchMap((payload) =>
        this.http
          .post(environment.api + '/auth/signup', {
            mail: payload.mail,
            password: payload.password
          })
          .pipe(
            mergeMap((response: any) =>{
              let toast=new Toast(response);
              toast.show=true;
              if(toast.severity==='success'){
                return  [
                  ShowToast({ toast: toast }),
                  RedirectToPage({page:"/"})
                ];
              }
              return  [
                ShowToast({ toast: toast }),
              ];
            })
          )
      )
    );
  });

}
