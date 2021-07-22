import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import connection from "./database.js";

import * as userController from "./Controllers/userController.js";
import * as financialController from "./Controllers/financialController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);

app.post("/sign-in", userController.signIn);

app.post("/financial-events", financialController.newEvent);

app.get("/financial-events", financialController.searchEvent);

app.get("/financial-events/sum", financialController.sumEvent);

export default app;
