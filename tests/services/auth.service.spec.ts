import { auth } from '../../src/api/services/CustomerServices';
import Customers from '../../src/api/models/customer';
import { authInputDTO } from '../../src/api/interfaces/customer/interfaces';

jest.mock('../../src/api/models/customer'); 

describe('auth', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return customer details if customer is found', async () => {
    const mockCustomer = {
      id: '123',
      cpf: '41115491873',
      save: jest.fn()
    };

    (Customers.findOne as jest.Mock).mockResolvedValue(mockCustomer);

    const input: authInputDTO = { cpf: '41115491873' };

    const result = await auth(input);

    expect(Customers.findOne).toHaveBeenCalledWith({ cpf: input.cpf });
    expect(result).toEqual({
      id: mockCustomer.id,
      cpf: mockCustomer.cpf,
    });
  });

  it('should create and return customer details if customer is not found', async () => {
    const mockCustomer = {
      id: '123',
      cpf: '41115491873',
      save: jest.fn()
    };

    (Customers.findOne as jest.Mock).mockResolvedValue(null);
    (Customers.create as jest.Mock).mockReturnValue(mockCustomer);

    const input: authInputDTO = { cpf: '41115491873' };

    const result = await auth(input);

    expect(Customers.findOne).toHaveBeenCalledWith({ cpf: input.cpf });
    expect(Customers.create).toHaveBeenCalledWith({ cpf: input.cpf });
    expect(result).toEqual({
      id: mockCustomer.id,
      cpf: mockCustomer.cpf,
    });
  });
});
