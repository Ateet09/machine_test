import * as logger from '../utils/logger';
import { ErrorCode } from '../utils/ErrorCode';
import { CartServices } from '../service/CartServices';

export class CartControllers{

    static async addProducts(req, res) {
    try {
      let result = await CartServices.addProducts(req.body);
      return res.status(200).send(result);
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
 
  static async getProductByUser(req, res) {
    try {
      let result = await CartServices.getProductsById(req.query);
      console.log(result)
      return res.status(200).send(result);
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