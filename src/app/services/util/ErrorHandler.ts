import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class MyErrorHandler implements ErrorHandler {

  constructor(private msg:MessageService,private router:Router){}

  handleError(error: any) {
    // do something with the exception
    this.msg.clear();
    this.msg.add({severity:'error',detail:error,summary:'Error',key:'global',sticky:true});
    console.log(error);
  }


}
