"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const userController_1 = __importDefault(require("../controller/userController"));
const ProductController_1 = __importDefault(require("../controller/ProductController"));
const port = 4573;
const url = "mongodb://0.0.0.0:27017/BARA_BE";
const LIVE_URI = "mongodb+srv://Esther:Esther2004@cluster0.byfqhoj.mongodb.net/BARA_BE?retryWrites=true&w=majority";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default
    .connect(LIVE_URI)
    .then(() => {
    console.log("database connection established");
})
    .catch((err) => {
    console.log("failed to connect", err);
});
app.use("/api/products", ProductController_1.default);
app.use("/api/users", userController_1.default);
app.listen(port, () => {
    console.log("listening on port", port);
});
