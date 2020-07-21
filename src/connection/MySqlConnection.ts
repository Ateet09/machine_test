import * as mysql from 'mysql2/promise';
import * as logger from '../utils/logger';
import * as configConstant from '../config/config.json';

/**
 * MySQL Connection 
 * =======================
 * This module is meant to keep the method to make mysql connection
 */
export class MySqlConnection {
  static dbConnect;
  /**
   * Static methode to make the SingleTon Class
   */
  static async connection() {
    if (!this.dbConnect) {
      logger.info("Database Connect is created");
      this.dbConnect = await mysql.createConnection({
          "host": configConstant.host,
          "user": configConstant.user,
          "password": configConstant.password,
          "database": configConstant.database
      });
    }
    return this.dbConnect;
  }
}
