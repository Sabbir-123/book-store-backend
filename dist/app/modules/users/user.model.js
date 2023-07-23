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
exports.User = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    money: {
        type: Number,
    },
    wishlist: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Book' }],
    currentlyReading: { type: String, required: false },
    finishedBooks: { type: [String], required: false },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        // transform: function (doc, ret) {
        //   delete ret["password"];
        //   return ret;
        // },
    },
});
userSchema.methods.isUserExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne({ email }, { email: 1, password: 1, role: 1 });
        return user;
    });
};
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        //hashing user password
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
userSchema.methods.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMatched = yield bcrypt_1.default.compare(givenPassword, savedPassword);
        return isMatched;
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
