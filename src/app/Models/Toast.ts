export interface IToast{
  severity:'error'|'success'|'warn'|'info',
  detail:string,
  summary:string,
  key:string,
  sticky:boolean,
  life:number,
  show:boolean
}

export class Toast{
  severity:'error'|'success'|'warn'|'info';
  detail:string;
  summary:string;
  key:string;
  sticky:boolean;
  life:number;
  show:boolean;
  constructor(data?:IToast){
    this.severity=data?data.severity?data.severity:'error':'error';
    this.detail=data?data.detail?data.detail:'Something went wrong':'Something went wrong',
    this.summary=data?data.summary?data.summary:'Error':'Error',
    this.key=data?data.key?data.key:'global':'global',
    this.sticky=data?data.sticky?data.sticky:false:false,
    this.life=data?data.life?data.life:3000:3000;
    this.show=data?data.show:false;
  }
}
