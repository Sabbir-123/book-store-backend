import { z } from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    user: z.object({
      role: z.string({
        required_error: "Role is required",
      }),
      password: z.string().optional(),
      name: z.object({
        firstName: z.string({
          required_error: "First name is required",
        }),
        lastName: z.string({
          required_error: "Last name is required",
        }),
      }),
      phoneNumber: z.string({
        required_error: "Phone number is required",
      }),
      address: z.string({
        required_error: "Address is required",
      }),
      money: z.string().optional(),

    }),
  }),
});

const updateCowHutUserZodSchema = z.object({
  body: z.object({
    role: z
      .string({
        required_error: "Role is required",
      })
      .optional(),
    password: z.string().optional(),
    name: z
      .object({
        firstName: z
          .string({
            required_error: "First name is required",
          })
          .optional(),
        lastName: z
          .string({
            required_error: "Last name is required",
          })
          .optional(),
      })
      .optional(),
    phoneNumber: z
      .string({
        required_error: "Phone number is required",
      })
      .optional(),
    address: z
      .string({
        required_error: "Address is required",
      })
      .optional(),
    budget: z.string().optional(),
    income: z.string().optional(),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: "phoneNumber is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateCowHutUserZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
};
