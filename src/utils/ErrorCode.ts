export class ErrorCode{
  static authTokenRequire = {
    status:"400Req",
    errorMessage:"Auth Token Required"
  }
  static invalidAuthToken = {
    errorCode:"400Inv",
    errorMessage:"Invalid Auth Token"
  }
  static unKnownError = {
    errorCode:"400Unk",
    errorMessage:"UnKnown error"
  }
  static sqlError = {
    errorCode:"500Sql",
    errorMessage:"Sql error"
  }
  static userDoesNotExist = {
    errorCode:"400Use",
    errorMessage:"User Does Not Exist"
  }
}