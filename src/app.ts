import express, { Application, Request, Response } from "express";
import router from "./modules/course/course.route";
import { CategoryRouter } from "./modules/category/category.route";
import { reviewRouter } from "./modules/review/review.route";

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

// Review

app.use("/api/reviews", reviewRouter.router);

export default app;
