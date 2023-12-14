import express, { Application, Request, Response } from "express";
import router from "./modules/course/course.route";

const app: Application = express();

// Middleware

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/course", router);

export default app;
