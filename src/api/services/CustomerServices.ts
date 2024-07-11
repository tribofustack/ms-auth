import { error } from "console";
import {
  authInputDTO,
  authOutputDTO,
  deleteInputDTO,
  deleteOutputDTO,
} from "../interfaces/customer/interfaces";
import Customers from "../models/customer";
import { isValidCPF } from "../../utils/helper";

export const auth = async (data: authInputDTO): Promise<authOutputDTO> => {
  const dataSearch = {
    cpf: data.cpf,
  };

  let customer: any = null;
  customer = await Customers.findOne(dataSearch);

  if (!customer) {
    customer = Customers.create(dataSearch);
  }

  return {
    id: customer.id,
    cpf: customer.cpf,
  };
};


export const deleteCustomer = async (data: deleteInputDTO): Promise<deleteOutputDTO> => {
  const isCPFValid = isValidCPF(data.cpf);
  if (!isCPFValid) {
    throw new Error('Validation error: CPF must contain exactly 11 digits');
  }

  const dataSearch = {
    cpf: data.cpf,
  };

  const customer = await Customers.findOne(dataSearch);

  if (!customer) {
    throw new Error('User not found');
  }

  await Customers.deleteOne({ cpf: customer.cpf });

  return {
    message: 'User has been deleted',
  };
};
