import express, { Application, Request, Response } from "express";
import router from "./modules/course/course.route";
import { CategoryRouter } from "./modules/category/category.route";

const app: Application = express();

// Middleware

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// Course
app.use("/api/course", router);

// Category

app.use("/api/categories", CategoryRouter.router);

export default app;
