import { object, string, number, InferType, boolean } from "yup";

export const CreateMenuSchema = object({
  name: string().required("Informe um nome para o cardápio."),
  storeId: string().required(
    "Informe o estabelecimento que o cardápio pertence."
  ),
});

export type CreateMenuDTO = InferType<typeof CreateMenuSchema>;
