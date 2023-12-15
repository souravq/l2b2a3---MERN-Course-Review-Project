import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import router from "./routes";

const app: Application = express();

// Middleware
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// Common routes used
app.use("/api", router);

// Middleware - Error Handler
app.use(globalErrorHandler);

// Not found - Middleware
app.use(notFound);

export default app;
