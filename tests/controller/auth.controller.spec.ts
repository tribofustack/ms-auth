import { Request, Response, NextFunction } from "express";
import { auth } from "../../src/api/Controllers/CustomerController";
import * as CustomerServices from "../../src/api/services/CustomerServices";
import { generateToken } from "../../src/utils/TokenGenerator";
import { isValidCPF } from "../../src/utils/helper";
import axios from "axios";

jest.mock("../../src/api/services/CustomerServices");
jest.mock("../../src/utils/TokenGenerator");
jest.mock("../../src/utils/helper");
jest.mock("axios");

describe("auth controller", () => {
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

    await auth(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'CPF is required.' });
  });

  it("should return 400 if CPF is invalid", async () => {
    (isValidCPF as jest.Mock).mockReturnValue(false);

    await auth(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid CPF.' });
  });

  it("should return 200 with token if CPF is valid", async () => {
    (isValidCPF as jest.Mock).mockReturnValue(true);
    (axios.get as jest.Mock).mockResolvedValue({ data: { data: [{ key: "key", secret: "secret" }] } });
    (CustomerServices.auth as jest.Mock).mockResolvedValue({});
    (generateToken as jest.Mock).mockReturnValue("mockToken");

    await auth(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ token: "mockToken" });
  });

  it("should handle errors", async () => {
    const errorMessage = "Something went wrong";
    (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await auth(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
  });
});
