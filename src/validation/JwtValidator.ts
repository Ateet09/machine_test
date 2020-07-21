import * as jwt from 'jsonwebtoken';

export class JwtValidator{
  static async decode1(jwtToken) {
    const decode = await jwt.verify(jwtToken, 'shhhhh');
    return decode;
  }
  static async encode(payload) {
    return await jwt.sign(payload, 'shhhhh', { expiresIn: '1h' });
  }
}