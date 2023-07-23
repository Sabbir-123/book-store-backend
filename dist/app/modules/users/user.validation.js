"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.object({
            role: zod_1.z.string({
                required_error: "Role is required",
            }),
            password: zod_1.z.string({
                required_error: "Password is required",
            }),
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: "First name is required",
                }),
                lastName: zod_1.z.string({
                    required_error: "Last name is required",
                }),
            }),
            email: zod_1.z.string({
                required_error: "Email is required",
            }),
            address: zod_1.z.string({
                required_error: "Address is required",
            }),
            money: zod_1.z.string().optional(),
        })
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "phoneNumber is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh Token is required",
        }),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    loginZodSchema,
    refreshTokenZodSchema,
};
