import { object, string, InferType } from "yup";

export const loginSchema = object({
  email: string().email().required("Informe um email válido."),
  password: string().required("Informe uma senha válida."),
});

export type LoginCredentials = InferType<typeof loginSchema>;
