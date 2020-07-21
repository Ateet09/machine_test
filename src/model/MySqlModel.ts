import * as _ from 'underscore';
import { MySqlConnection } from '../connection/MySqlConnection';
import * as logger from '../utils/logger';
import { ErrorCode } from '../utils/ErrorCode';

export class MySqlModel{
  static async getRecord(table, fields, where = '', whereParams = '', orderBy = '') {
    try {
      const dbConnect = await MySqlConnection.connection();
      let responseObj = {};
      let whereParamsArray;
      let whereParamIsArray = false;
      if (_.isEmpty(fields)) {
          fields = '*';
      }

      if (_.isEmpty(where)) {
          where = 'id != "" ';
      }

      if (!_.isEmpty(whereParams) && whereParams.match(/[,]/)) {
          whereParamsArray = whereParams;
          whereParams = whereParamsArray.split(',');
          whereParamIsArray = true;
      }

      let sql = `SELECT ${fields} from ${table} WHERE ${where} `;
      if (!_.isEmpty(orderBy)) {
          sql = `SELECT ${fields} from ${table} WHERE ${where} ORDER BY ${orderBy}`;
      }

      if (whereParamIsArray) {
          console.info("\n Get SQL query", sql, whereParams)
          const [articleRow, articleFields] = await dbConnect.query(sql, whereParams);
          return articleRow;
      } else {
          console.info("\n Get SQL query", sql, [whereParams])
          const [articleRow, articleFields] = await dbConnect.query(sql, [whereParams]);
          return articleRow;
      }
  }
  catch (error) {
      logger.error(`error in getRecord Method ${JSON.stringify(error)}`);
      throw ErrorCode.sqlError;
  }    
  }

  static async addRecord(table, insertObj) {
    try {
      const dbConnect = await MySqlConnection.connection();
      let responseObj = {};
      let sql = `INSERT INTO ${table} SET ?`;
      const result = await dbConnect.query(sql, insertObj);
    return result[0];
     
    }
  catch (error) {
      logger.error(`error in getRecord Method ${JSON.stringify(error)}`);
      throw ErrorCode.sqlError;
  }    
  }

  static async gerericFun(sql) {
    try {
        
        const dbConnect = await MySqlConnection.connection();
        let result = await dbConnect.query(sql);
        return result[0];
    }
  catch (error) {
      logger.error(`error in getRecord Method ${JSON.stringify(error)}`);
      throw ErrorCode.sqlError;
  }    
  }
}