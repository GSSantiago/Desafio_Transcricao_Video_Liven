import * as dotenv from 'dotenv'; 
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import errorHandler from "./middlewares/error-handler";

import routes from "./routes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/v1', routes);

app.use(errorHandler);

export default app;
