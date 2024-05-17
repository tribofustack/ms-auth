import jwt from "jsonwebtoken";

export const generateToken = (payload: any, secret: any, key: any): string => {
  const token = jwt.sign(payload, secret, { keyid: key, expiresIn: '1d' });
  return token;
};

export const tokenData = (token: string): { id: string; expired: number } => {
  const payload: any = jwt.verify(token, process.env.JWT_KEY as string);
  return { id: payload.id, expired: payload.exp };
};

export const tokenExpired = (token: string): void => {
  try {
    jwt.verify(token, process.env.JWT_KEY as string);
  } catch (error) {
    throw error;
  }
};
