import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "please enter a valid email" }),
  password: z
    .string({ message: "please enter a valid password" })
    .min(8, { message: "password must be at least 8 characters long" }),
});
export type LoginSchema = z.infer<typeof loginSchema>;

export const createClassroomSchema = z.object({
  name: z
    .string({ message: "please enter a valid school name" })
    .min(2, { message: "please enter a valid school name" }),
});
export type CreateClassroomSchema = z.infer<typeof createClassroomSchema>;

export const createSubjectSchema = z.object({
  name: z
    .string({ message: "please enter a valid subject name" })
    .min(2, { message: "please enter a valid subject name" }),
})
export type CreateSubjectSchema = z.infer<typeof createSubjectSchema>