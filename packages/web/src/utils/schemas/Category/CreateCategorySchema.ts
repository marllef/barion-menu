import { object, string, number, InferType, boolean } from "yup";

export const CreateCategorySchema = object({
  name: string().required("Informe um nome para a categoria."),
  active: boolean().notRequired().default(true),
  menuId: number().required("Informe o menu que a categoria pertence."),
});

export type CreateProductType = InferType<typeof CreateCategorySchema>;
