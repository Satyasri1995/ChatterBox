
import { Router } from '@angular/router';
import { AuthLogin, AuthLogout } from './../auth/auth.actions';
import { MessageService } from 'primeng/api';
import { of, switchMap, tap, mergeMap } from 'rxjs';
import { ResetToast, ShowToast, RedirectToPage } from './ui.actions';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { IToast, Toast } from 'src/app/Models/Toast';


@Injectable()
export class UIEffects{

  constructor(private actions$:Actions,private msg:MessageService,private router:Router){}

  showToast = createEffect(()=>{
   return this.actions$.pipe(
      ofType(ShowToast),
      switchMap((payload)=>{
        let toast:IToast=new Toast(payload.toast);
        if(toast.show){
          this.msg.clear();
          if(toast.data?.length){
            toast.key="multipleError"
          }
          this.msg.add(toast);
        }
        return of(ResetToast());
      })
    )
  })

  Redirect = createEffect(()=>{
    return this.actions$.pipe(
      ofType(RedirectToPage),
      tap((payload)=>{
        this.router.navigateByUrl(payload.page);
      })
    )
  },{dispatch:false})

  Logout = createEffect(()=>{
    return this.actions$.pipe(
      ofType(AuthLogout),
      switchMap(()=>{
        return of(RedirectToPage({page:"/"}))
      })
    )
  })

  Login = createEffect(()=>{
    return this.actions$.pipe(
      ofType(AuthLogin),
      mergeMap((payload)=>{
        if(payload.auth){
          if(payload.auth.isLoggedIn){
            return [
              RedirectToPage({page:"/ChatterBox/chatBox"})
            ]
          }
        }
        return [
          RedirectToPage({page:"/"})
        ]
      })
    )
  })

}


