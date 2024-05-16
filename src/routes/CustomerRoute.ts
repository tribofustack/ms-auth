import express from "express";
import * as controller from "../api/Controllers/CustomerController";

const routes = express.Router();

routes.post("/auth", controller.auth);

export default routes;
