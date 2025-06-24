import express, {Application, Request, Response, NextFunction} from "express";
import AuthRoutes from "./modules/auth/auth.routes";
import {jsonSyntaxErrorHandler} from "./middlewares/jsonSyntaxErrorHandler"

const app: Application = express();

app.use(express.json());

app.use(jsonSyntaxErrorHandler)




app.use('/api/auth', AuthRoutes)



export default app;
