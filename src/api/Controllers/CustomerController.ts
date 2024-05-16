import { Request, Response, NextFunction } from "express";
import * as CustomerServices from "../services/CustomerServices";
import { generateToken } from "../../utils/TokenGenerator";
import { isValidCPF } from "../../utils/helper";

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

    const result = await CustomerServices.auth({ cpf });

    res.status(200).send({
      token: generateToken(result.cpf),
    });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};
