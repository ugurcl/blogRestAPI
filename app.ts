import express, { Application, Request, Response, NextFunction } from "express";
import AuthRoutes from "./modules/auth/auth.routes";
import UserRoutes from "./modules/user/user.routes";
import CategorieRoute from "./modules/category/category.route";
import PostRoute from "./modules/post/post.route";
import CommentRoute from "./modules/comment/comment.route";
import { apiLimiter } from "./utils/rateLimiter";
import morgan from "morgan";
import { jsonSyntaxErrorHandler } from "./middlewares/jsonSyntaxErrorHandler";
import fs from "fs";
import path from "path";


const app: Application = express();

app.use(express.json());

const logStream = fs.createWriteStream(
  path.join(__dirname, "./logs/access.log"),
  {
    flags: "a",
  }
);

app.use(morgan("combined", { stream: logStream }));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(jsonSyntaxErrorHandler);

app.use("/api/auth", apiLimiter, AuthRoutes);
app.use("/api/users", apiLimiter, UserRoutes);
app.use("/api/categories", CategorieRoute);
app.use("/api/posts", PostRoute);
app.use("/api/comments", CommentRoute);

export default app;
