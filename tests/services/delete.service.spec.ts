import { deleteCustomer } from '../../src/api/services/CustomerServices';
import Customers from '../../src/api/models/customer';
import { deleteInputDTO } from '../../src/api/interfaces/customer/interfaces';
import { isValidCPF } from '../../src/utils/helper';

jest.mock('../../src/api/models/customer');
jest.mock('../../src/utils/helper');

describe('deleteCustomer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if CPF is invalid', async () => {
    (isValidCPF as jest.Mock).mockReturnValue(false);

    const input: deleteInputDTO = { cpf: '1234567890' };

    await expect(deleteCustomer(input)).rejects.toThrow('Validation error: CPF must contain exactly 11 digits');
    expect(isValidCPF).toHaveBeenCalledWith(input.cpf);
  });

  it('should throw an error if user is not found', async () => {
    (isValidCPF as jest.Mock).mockReturnValue(true);
    (Customers.findOne as jest.Mock).mockResolvedValue(null);

    const input: deleteInputDTO = { cpf: '41115491873' };

    await expect(deleteCustomer(input)).rejects.toThrow('User not found');
    expect(Customers.findOne).toHaveBeenCalledWith({ cpf: input.cpf });
  });

  it('should delete the customer if user is found', async () => {
    const mockCustomer = {
      id: '123',
      cpf: '41115491873',
    };

    (isValidCPF as jest.Mock).mockReturnValue(true);
    (Customers.findOne as jest.Mock).mockResolvedValue(mockCustomer);
    (Customers.deleteOne as jest.Mock).mockResolvedValue({});

    const input: deleteInputDTO = { cpf: '41115491873' };

    const result = await deleteCustomer(input);

    expect(Customers.findOne).toHaveBeenCalledWith({ cpf: input.cpf });
    expect(Customers.deleteOne).toHaveBeenCalledWith({ cpf: input.cpf });
    expect(result).toEqual({
      message: 'User has been deleted',
    });
  });
});
