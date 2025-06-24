import express, {Application, Request, Response, NextFunction} from "express";
import AuthRoutes from "./modules/auth/auth.routes";
import UserRoutes from "./modules/user/user.routes";

import {jsonSyntaxErrorHandler} from "./middlewares/jsonSyntaxErrorHandler"
import path from "path";


const app: Application = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(jsonSyntaxErrorHandler)




app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes );




export default app;
