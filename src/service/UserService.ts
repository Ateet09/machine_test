import { MySqlModel } from '../model/MySqlModel';
import * as tableList from '../inc/tableList.json';
import * as logger from '../utils/logger';
import * as _ from 'underscore';
import { ErrorCode } from '../utils/ErrorCode';
import { JwtValidator } from '../validation/JwtValidator';

export class AuthService{
  static async login(reqBody) {
    try {
      console.log(tableList.login)
      const whereValue: Array<string>=[reqBody.email,reqBody.password];
      const userData= await MySqlModel.getRecord(tableList.login,"id, email","email =? AND password=?",`${reqBody.email},${reqBody.password}`);
      if (_.isNull(userData[0]) || _.isEmpty(userData[0])) {
        logger.error(ErrorCode.userDoesNotExist)
        throw ErrorCode.userDoesNotExist;
      } 
      else {
        // console.log(userData[0]);
        const accessToken= await JwtValidator.encode( {
          id : userData[0].id,
          email : userData[0].email
        });
        return {status:200,accessToken}
      }
    }
    catch (err) {
      let { status, errorMessage } = err;
      if (status && errorMessage) throw err;
      else {
        logger.error(err);
        throw ErrorCode.unKnownError;
      }
    }
  }
}