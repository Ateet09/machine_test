import * as express from 'express';
import { AuthController } from './controller/AuthController';
import { ProductControllers } from './controller/productsControllers';
import { CartControllers } from './controller/CartControllers';
import { JwtValidator } from './validation/JwtValidator';
import { ErrorCode } from './utils/ErrorCode';
const app = express();

/**
 * MiddleWare to decode Auth token
 * @param req request object
 * @param res response Object
 * @param next call next
 */
const decode = async (req, res, next) => {
  try {
    let result;
    if (req.headers.accesstoken) result = await JwtValidator.decode1(req.headers.accesstoken);
    else {
      res.status(400).send(ErrorCode.authTokenRequire);
    }
    next();
  }
  catch (err) {
    res.status(400).send(ErrorCode.invalidAuthToken);
  }
}

//Body Parser Middleware
app.use(express.json());

//To handle url encoded data (for forms)
app.use(express.urlencoded({ extended: true }));

app.post('/login',   AuthController.login);
app.get('/getproducts', decode,ProductControllers.getProducts);
app.post('/addProducts', decode, CartControllers.addProducts);
app.get('/getProductByUser', decode, CartControllers.getProductByUser);
app.listen(3000, () => console.log(`Server is running on Port 3000`));
app.disable('x-powered-by');