import express, { Application, Request, Response } from "express";
import router from "./modules/course/course.route";
import { CategoryRouter } from "./modules/category/category.route";
import { reviewRouter } from "./modules/review/review.route";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";

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

// Middleware - Error Handler
app.use(globalErrorHandler);

// Not found - Middleware

app.use(notFound);

export default app;
