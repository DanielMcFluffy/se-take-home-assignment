import { Status } from "./models";

export class BaseResponse {
  message!: string;
  status!: Status;
  constructor(message: string, status: Status) {
    this.message = message;
    this.status = status;
  }
}

export class ErrorResponse extends BaseResponse {
  constructor(message: string) {
    super(message, 'error');
  }
}

export class CompleteResponse extends BaseResponse {
  constructor(message: string) {
    super(message, 'complete');
  }
}

export class PendingResponse extends BaseResponse {
  constructor(message: string) {
    super(message, 'pending');
  }
}
