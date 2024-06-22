export class CustomError extends Error {
  errorDescription?: Error;
  status: number;
  constructor(message: string, status: number, error?: Error) {
    super();
    this.message = message;
    this.status = status;
    this.stack = error?.stack ? error.stack : ""
    this.name = error?.name ? error.name : "Error"
  }
}

export type JsonSuccessResponse = {
  success : boolean,
  message : string,
  status : number,
  data : {[key : string] : any}[]
}
export type JsonErrorResponse = {
  success : boolean,
  message : string,
  status : number,
  stack? : string,
  name? : string
}



