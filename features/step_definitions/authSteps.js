const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const http = require('http');
const request = require('supertest');
const app = require('../../src/app').default; 

let server;
let response;
let cpf;

setDefaultTimeout(10000);

Before(() => {
  return new Promise((resolve) => {
    server = http.createServer(app);
    server.listen(0, () => {
      resolve();
    });
  });
});

After(() => {
  return new Promise((resolve) => {
    server.close(() => {
      resolve();
    });
  });
});

Given('a user with CPF {string}', (cpfInput) => {
  cpf = cpfInput;
});

When('the user sends a POST request to {string}', async (endpoint) => {
  const chai = await import('chai');
  const { expect } = chai;
  console.log('server')
  response = await request(server)
    .post("/customer/auth")
    .send({ cpf: cpf });
});

Then('the response should be {int}', async (statusCode) => {
  const chai = await import('chai');
  const { expect } = chai;
  expect(response.status).to.equal(statusCode);
});

Then('the response should contain a JWT token', async () => {
  const chai = await import('chai');
  const { expect } = chai;
  expect(response.body).to.have.property('token');
});

Then('the response should contain an error message {string}', async (errorMessage) => {
  const chai = await import('chai');
  const { expect } = chai;
  expect(response.body).to.have.property('error', errorMessage);
});