import { MySqlModel } from '../model/MySqlModel';
import * as tableList from '../inc/tableList.json';
import * as logger from '../utils/logger';
import * as _ from 'underscore';
import { ErrorCode } from '../utils/ErrorCode';
import * as moment from 'moment';
import { JwtValidator } from '../validation/JwtValidator';

export class CartServices {
	
    static async addProducts(req) {
		try {
            let params = req.body;
            let user = await JwtValidator.decode1(req.headers.accesstoken);
            let userId = user.id;
            let insertObj = {
                userId : userId,
                product_id : params.product_id,
                created_at : moment().format("YYYY-MM-DD HH:mm:ss")
            }
			let addRecords = await MySqlModel.addRecord(tableList.cart, insertObj);
			
			return {status: 200, addRecords}

		} catch (err) {
			let {status,errorMessage} = err;
			if (status && errorMessage) throw err;
			else {
				logger.error(err);
				throw ErrorCode.unKnownError;
			}
		}
    }
    
    static async getProductsById(reqQuery) {
		try {
            console.log(reqQuery)
            let user = await JwtValidator.decode1(reqQuery.headers.accesstoken);
            let sql = `SELECT products.id, products.name, products.description, products.price, products.make FROM ${tableList.cart} as cart INNER JOIN ${tableList.products} as products ON cart.product_id = products.id WHERE cart.userId = '${user.id}'`
			let getrecords = await MySqlModel.gerericFun(sql);
			
			return {status: 200, getrecords}

		} catch (err) {
			let {status,errorMessage} = err;
			if (status && errorMessage) throw err;
			else {
				logger.error(err);
				throw ErrorCode.unKnownError;
			}
		}
	}
}