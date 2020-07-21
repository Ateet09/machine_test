import { MySqlModel } from '../model/MySqlModel';
import * as tableList from '../inc/tableList.json';
import * as logger from '../utils/logger';
import * as _ from 'underscore';
import { ErrorCode } from '../utils/ErrorCode';
import { JwtValidator } from '../validation/JwtValidator';

export class ProductsServices {
	static async listProduct() {
		try {
			const productsData = await MySqlModel.getRecord(tableList.products, "id, name, description, price, make");
			console.log(productsData);
			return {
				status: 200,
				productsData
			}

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