import jwt from "jsonwebtoken";

export const generateToken = (payload: any, secret: any, key: any): string => {
  const token = jwt.sign(payload, secret, { keyid: key, expiresIn: '1d' });
  return token;
};
