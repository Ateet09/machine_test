import { MySqlModel } from '../model/MySqlModel';
import * as tableList from '../inc/tableList.json';
import * as logger from '../utils/logger';
import * as _ from 'underscore';
import { ErrorCode } from '../utils/ErrorCode';
import * as moment from 'moment';

export class CartServices {
	
    static async addProducts(reqBody) {
		try {
            let insertObj = {
                userId : reqBody.userId,
                product_id : reqBody.product_id,
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
            let sql = `SELECT products.id, products.name, products.description, products.price, products.make FROM ${tableList.cart} as cart INNER JOIN ${tableList.products} as products ON cart.product_id = products.id WHERE cart.userId = '${reqQuery.userId}'`
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