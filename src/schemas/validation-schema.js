import { z } from "zod";

const noSpace = (value) => !/\s/.test(value);

export const CAR_MODELS = [
  "SUV",
  "MPV",
  "Crossover",
  "Sedan",
  "Hatchback",
  "Sport",
  "Pickup",
  "Minivan",
  "Coupe",
];

export const CAR_TRANSMISSIONS = [
  "Manual",
  "Automatic",
  "Semi-Automatic",
  "Continuously Variable Transmission (CVT)",
  "Dual-Clutch Transmission (DCT)",
  "Tiptronic",
];

export const CAR_FUELS = [
  "Petrol (Bensin)",
  "Diesel",
  "Electric",
  "Hybrid",
  "CNG (Compressed Natural Gas)",
  "LPG (Liquefied Petroleum Gas)",
];

export const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(20, { message: "Username must be at most 20 characters" })
      .refine((val) => val === val.toLowerCase(), {
        message: "Username must be lowercase",
      })
      .refine(noSpace, {
        message: "No spaces allowed",
      }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .refine(noSpace, {
        message: "No spaces allowed",
      }),
    confirm_password: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters" })
      .refine(noSpace, {
        message: "No spaces allowed",
      }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords don't match",
      });
    }
  });

export const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" })
    .refine((val) => val === val.toLowerCase(), {
      message: "Username must be lowercase",
    })
    .refine(noSpace, {
      message: "No spaces allowed",
    }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .refine(noSpace, {
        message: "No spaces allowed",
      }),
    confirm_password: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters" })
      .refine(noSpace, {
        message: "No spaces allowed",
      }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords don't match",
      });
    }
  });

export const reviewCreateSchema = z.object({
  car_id: z.number().min(1, { message: "Car ID is required" }),
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  content: z.string().min(1, { message: "Content is required" }),
  image_url: z.string().url({ message: "Invalid URL format for image URL" }),
});

export const commentCreateSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Content is required" })
    .max(255, { message: "Content must be at most 255 characters long" }),
});

export const reviewUpdateSchema = reviewCreateSchema;

export const commentUpdateSchema = commentCreateSchema;

export const profileUpdateSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .max(20, { message: "Username must be at most 20 characters" })
    .refine((val) => val === val.toLowerCase(), {
      message: "Username must be lowercase",
    })
    .refine(noSpace, {
      message: "No spaces allowed",
    }),
  email: z.string().email("Invalid email address"),
  full_name: z.string().optional(),
  bio: z.string().optional(),
  age: z.number().nonnegative("Age must be a positive number").optional(),
  gender: z
    .enum(
      ["MALE", "FEMALE"],
      "Invalid gender value accepted only MALE or FEMALE",
    )
    .optional(),
});

export const carCreateSchema = z.object({
  brand_id: z
    .number()
    .positive({ message: "Brand ID harus merupakan angka positif" })
    .int({ message: "Brand ID harus berupa integer" }),
  name: z.string().min(1, { message: "Nama harus diisi" }),
  model: z.enum(CAR_MODELS, {
    message: `Model tidak valid, harus salah satu dari: ${CAR_MODELS.join(", ")}`,
  }),
  year: z
    .number()
    .min(1878, { message: "Tahun harus setidaknya 1878" })
    .max(new Date().getFullYear(), {
      message: "Tahun harus kurang dari atau sama dengan tahun ini",
    }),
  image_url: z.string().url({ message: "Format URL gambar tidak valid" }),
  width: z
    .number()
    .positive({ message: "Lebar harus merupakan angka positif" })
    .int({ message: "Lebar harus berupa integer" })
    .max(32767, { message: "Lebar harus kurang dari atau sama dengan 32767" }),
  height: z
    .number()
    .positive({ message: "Tinggi harus merupakan angka positif" })
    .int({ message: "Tinggi harus berupa integer" })
    .max(32767, { message: "Tinggi harus kurang dari atau sama dengan 32767" }),
  length: z
    .number()
    .positive({ message: "Panjang harus merupakan angka positif" })
    .int({ message: "Panjang harus berupa integer" })
    .max(32767, {
      message: "Panjang harus kurang dari atau sama dengan 32767",
    }),
  engine: z.string().min(1, { message: "Mesin harus diisi" }),
  torque: z
    .number()
    .positive({ message: "Torsi harus merupakan angka positif" })
    .int({ message: "Torsi harus berupa integer" })
    .max(32767, { message: "Torsi harus kurang dari atau sama dengan 32767" }),
  transmission: z.enum(CAR_TRANSMISSIONS, {
    message: `Transmisi tidak valid, harus salah satu dari: ${CAR_TRANSMISSIONS.join(", ")}`,
  }),
  acceleration: z
    .number()
    .positive({ message: "Akselerasi harus merupakan angka positif" }),
  horse_power: z
    .number()
    .positive({ message: "Horse power harus merupakan angka positif" })
    .int({ message: "Horse power harus berupa integer" })
    .max(32767, {
      message: "Horse power harus kurang dari atau sama dengan 32767",
    }),
  breaking_system_front: z
    .string()
    .min(1, { message: "Sistem pengereman depan harus diisi" }),
  breaking_system_back: z
    .string()
    .min(1, { message: "Sistem pengereman belakang harus diisi" }),
  fuel: z.enum(CAR_FUELS, {
    message: `Jenis bahan bakar tidak valid, harus salah satu dari: ${CAR_FUELS.join(", ")}`,
  }),
});
