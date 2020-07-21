import * as logger from '../utils/logger';
import { ErrorCode } from '../utils/ErrorCode';
import { ProductsServices } from '../service/ProductService';

export class ProductControllers{
  static async getProducts(req, res) {
    try {
      const result = await ProductsServices.listProduct();
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