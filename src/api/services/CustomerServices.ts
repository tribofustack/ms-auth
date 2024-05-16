import {
  authInputDTO,
  authOutputDTO,
} from "../interfaces/customer/interfaces";
import Customers from "../models/customer";

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
