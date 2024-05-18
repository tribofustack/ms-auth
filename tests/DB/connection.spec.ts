import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mongooseConnection, { getDBConfig } from '../../src/DB/connectionMongoose';

dotenv.config();

jest.mock('mongoose');

describe('Database Connection Tests', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = process.env;
    jest.resetModules();
    jest.clearAllMocks();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('getDBConfig', () => {
    it('should return the correct environment variables', () => {
      const DB_USER = 'testUser';
      const DB_PASSWORD = 'testPassword';
      const DB_DATABASE = 'testDatabase';
      const DB_SERVER = 'testServer';

      process.env.DB_USER = DB_USER;
      process.env.DB_PASSWORD = DB_PASSWORD;
      process.env.DB_DATABASE = DB_DATABASE;
      process.env.DB_SERVER = DB_SERVER;

      const config = getDBConfig();
      expect(config).toEqual({ DB_USER, DB_PASSWORD, DB_DATABASE, DB_SERVER });
    });

    it('should return default values if environment variables are not set', () => {
      delete process.env.DB_USER;
      delete process.env.DB_PASSWORD;
      delete process.env.DB_DATABASE;
      delete process.env.DB_SERVER;

      const config = getDBConfig();
      expect(config).toEqual({ DB_USER: '', DB_PASSWORD: '', DB_DATABASE: '', DB_SERVER: '' });
    });
  });

  describe('mongooseConnection', () => {
    it('should connect to MongoDB with the correct URI', async () => {
      const DB_USER = 'testUser';
      const DB_PASSWORD = 'testPassword';
      const DB_DATABASE = 'testDatabase';
      const DB_SERVER = 'testServer';

      process.env.DB_USER = DB_USER;
      process.env.DB_PASSWORD = DB_PASSWORD;
      process.env.DB_DATABASE = DB_DATABASE;
      process.env.DB_SERVER = DB_SERVER;

      const expectedUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}${DB_SERVER}/${DB_DATABASE}?retryWrites=true&w=majority`;

      (mongoose.connect as jest.Mock).mockResolvedValueOnce(mongoose);

      await mongooseConnection();

      expect(mongoose.connect).toHaveBeenCalledWith(expectedUri);
    });

    it('should throw an error if connection fails', async () => {
      const errorMessage = 'Connection failed';
      (mongoose.connect as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(mongooseConnection()).rejects.toThrow(errorMessage);
    });
  });
});
