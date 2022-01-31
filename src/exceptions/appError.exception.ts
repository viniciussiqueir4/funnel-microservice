class AppError {
  public readonly messages: string[];

  public readonly statusCode: number;

  constructor(messages: string[], statusCode: number) {
    this.messages = messages;
    this.statusCode = statusCode;
  }
}

export default AppError;
