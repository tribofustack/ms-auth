import { Request, Response, NextFunction } from "express";
import * as CustomerServices from "../services/CustomerServices";
import { generateToken } from "../../utils/TokenGenerator";
import { isValidCPF } from "../../utils/helper";
import axios from "axios";

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cpf } = req.body;

    if (!cpf) {
      return res.status(400).json({ error: 'CPF is required.' });
    }

    const isCPFValid = isValidCPF(cpf);
    if (!isCPFValid) {
      return res.status(400).json({ error: 'Invalid CPF.' });
    }

    const url = `${process.env.AUTH_URL}/consumers/${process.env.CONSUMER}/jwt`;
    const { data: response } = await axios.get(url);
    const [{ key, secret }] = response.data;

    await CustomerServices.auth({ cpf });

    const payload = { isCPFValid };
    const token = generateToken(payload, secret, key);

    res.status(200).send({
      token: token,
    });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

export const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cpf } = req.body;

    if (!cpf) {
      return res.status(400).json({ error: 'CPF is required.' });
    }

    const isCPFValid = isValidCPF(cpf);
    if (!isCPFValid) {
      return res.status(400).json({ error: 'Invalid CPF.' });
    }

    const response = await CustomerServices.deleteCustomer({ cpf });

    res.status(200).send({ message: response });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};