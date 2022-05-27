class Response{
  constructor(status,severity,summary,detail,data){
    this.status=status;
    this.severity=severity;
    this.summary=summary;
    this.detail=detail;
    this.data=data
  }
}

module.exports=Response;
