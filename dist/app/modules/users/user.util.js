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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUseId = exports.findLastUserId = void 0;
const user_model_1 = require("./user.model");
const findLastUserId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield user_model_1.User.findOne({}, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return lastUser === null || lastUser === void 0 ? void 0 : lastUser.id;
});
exports.findLastUserId = findLastUserId;
const generateUseId = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const lastBuyerId = yield user_model_1.User.findOne({ role: "buyer" }, { id: 1 })
        .sort({ id: -1 })
        .lean();
    let prefix = "";
    let currentId = 0;
    if (role === "buyer") {
        prefix = "B";
        currentId = lastBuyerId ? parseInt(lastBuyerId.id.slice(1)) : 0;
    }
    else {
        throw new Error("Invalid user role");
    }
    const incrementedId = (currentId + 1).toString().padStart(4, "0");
    const generatedId = `${prefix}${incrementedId}`;
    return generatedId;
});
exports.generateUseId = generateUseId;
