"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_route_1 = __importDefault(require("./modules/course/course.route"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/course", course_route_1.default);
exports.default = app;
