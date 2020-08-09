export class ResultTransfer {

  result: boolean;
  message: string;
  data: object;

  constructor(Result,Message,Data) {
    this.result = Result;
    this.message = Message;
    this.data = Data;
  }

}
