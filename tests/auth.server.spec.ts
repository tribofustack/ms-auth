import app from '../src/app';
import { Server } from 'http';
import { normalizePort } from '../index';
import dotenv from 'dotenv';

jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

jest.mock('../src/app', () => ({
  listen: jest.fn((port, callback) => {
    if (callback) callback();
    return {} as Server;
  }),
}));

describe('Index', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'test';
  });


  it('should load environment variables from .env', () => {
    jest.isolateModules(() => {
      require('../index');
    });
    expect(dotenv.config).toHaveBeenCalledWith({ path: '.env.development' });
  });

  it('should normalize the port and start the server', () => {
    process.env.PORT = '4000'
    const port = normalizePort(process.env.PORT || 3000);
    expect(port).toBe(4000);
  });

  it('should use default port if PORT is not defined', () => {
    delete process.env.PORT;
    const port = normalizePort(process.env.PORT || 3000);
    expect(port).toBe(3000);
  });

  it('should normalize the port to a default value if it is not a number', () => {
    const { normalizePort } = require('../index');
    const port = normalizePort('not-a-number');

    expect(port).toBe(3000);
  });
});
