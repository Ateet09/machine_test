import * as logger from '../utils/logger';
import { ErrorCode } from '../utils/ErrorCode'
import { AuthService } from '../service/AuthService';

export class AuthController{
  static async login(req, res) {
    try {
      const result = await AuthService.login(req.body);
      return     res.status(200).send(result);
    }
    catch (err) {
      let { errorCode, errorMessage } = err;
      if (errorCode && errorMessage) return res.status(400).send(err);
      else {
        logger.error(err);
        return res.status(400).send(ErrorCode.unKnownError);
      }
    }
  }
  
}