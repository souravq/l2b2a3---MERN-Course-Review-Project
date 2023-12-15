import express, { Application, Request, Response } from "express";
//import router, { courseRouter } from "./modules/course/course.route";
//import { CategoryRouter } from "./modules/category/category.route";
//import { reviewRouter } from "./modules/review/review.route";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import router from "./routes";

const app: Application = express();

// Middleware
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// Course
app.use("/api", router);

// Category

// app.use("/api", CategoryRouter.router);

// // Review

// app.use("/api", reviewRouter.router);

// Middleware - Error Handler
app.use(globalErrorHandler);

// Not found - Middleware

app.use(notFound);

export default app;
