"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_route_1 = __importDefault(require("./modules/course/course.route"));
const category_route_1 = require("./modules/category/category.route");
const review_route_1 = require("./modules/review/review.route");
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World");
});
// Course
app.use("/api/course", course_route_1.default);
// Category
app.use("/api/categories", category_route_1.CategoryRouter.router);
// Review
app.use("/api/reviews", review_route_1.reviewRouter.router);
// Middleware - Error Handler
app.use(globalErrorHandler_1.default);
// Not found - Middleware
app.use(notFound_1.default);
exports.default = app;
