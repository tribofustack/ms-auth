import { Request, Response, NextFunction } from "express";
import { deleteCustomer } from "../../src/api/Controllers/CustomerController";
import * as CustomerServices from "../../src/api/services/CustomerServices";
import { isValidCPF } from "../../src/utils/helper";

jest.mock("../../src/api/services/CustomerServices");
jest.mock("../../src/utils/helper");

describe("deleteCustomer controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {
        cpf: "12345678909",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if CPF is not provided", async () => {
    req.body.cpf = undefined;

    await deleteCustomer(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'CPF is required.' });
  });

  it("should return 200 if customer is deleted successfully", async () => {
    (CustomerServices.deleteCustomer as jest.Mock).mockResolvedValue('User has been deleted');

    await deleteCustomer(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ message: 'User has been deleted' });
  });

  it("should handle errors", async () => {
    const errorMessage = "Something went wrong";
    (CustomerServices.deleteCustomer as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await deleteCustomer(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
  });
});
