"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productModels_1 = __importDefault(require("../models/productModels"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const multer_1 = require("../utils/multer");
// create product
router.post("/new-product", multer_1.uploadProducConfig, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price, productImage, quantity, status, desc, category, oldPrice, } = req.body;
        const imgUploader = yield cloudinary_1.default.uploader.upload(req === null || req === void 0 ? void 0 : req.file.path);
        const products = yield productModels_1.default.create({
            title,
            price,
            productImage: imgUploader === null || imgUploader === void 0 ? void 0 : imgUploader.secure_url,
            quantity,
            status: true,
            desc,
            category,
            oldPrice,
        });
        if (!products) {
            return res.status(201).json({
                message: "couldn't create product",
            });
        }
        else {
            return res.status(201).json({
                message: "new product added",
                data: products,
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "unable to create product",
            data: error,
            errMsg: error.message,
        });
    }
}));
//purchasing product
//get all products
router.get("/allproducts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getProducts = yield productModels_1.default.find().sort({ createdAt: -1 });
        return res.status(200).json({
            messsage: "gotten all products",
            data: getProducts,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "an error occured",
        });
    }
}));
router.get("/allproducts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getProducts = yield productModels_1.default.findById(req.params.id);
        return res.status(200).json({
            messsage: "gotten all products",
            data: getProducts,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "an error occured",
        });
    }
}));
exports.default = router;
