import { object, string, number, InferType } from "yup";

export const CreateProductSchema = object({
  name: string().required(),
  category: number().integer().required(),
  price: number().positive().required(),
  quantity: number().integer().positive().moreThan(0).required(),
  desc: string().required(),
});

export type CreateProduct = InferType<typeof CreateProductSchema>;
