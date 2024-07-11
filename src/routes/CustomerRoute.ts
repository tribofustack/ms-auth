import express from "express";
import * as controller from "../api/Controllers/CustomerController";

const routes = express.Router();

routes.post("/auth", controller.auth);
routes.post("/deleteCustomer", controller.deleteCustomer);

export default routes;
