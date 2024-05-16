import jwt from "jsonwebtoken";

export const generateToken = (id: string): string => {
  const token: string = jwt.sign({ id }, process.env.JWT_KEY as string);
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
