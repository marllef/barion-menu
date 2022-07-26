import { Close } from "@radix-ui/react-dialog";
import { ReactNode, useRef, useState } from "react";
import { Button } from "~/components/Buttons/Button";
import { Card } from "~/components/Card";
import { IoMdClose } from "react-icons/io";
import styles from "./EditProduct.module.css";
import { Modal } from "~/components/Modals/Modal";
import { Form } from "@unform/web";
import { Input } from "~/components/Inputs/Input";
import { Select } from "~/components/Inputs/Select";
import { FormHandles, FormHelpers } from "@unform/core";
import { useMenu } from "~/hooks/useMenu";
import { ProductServices } from "~/services/ProductServices";
import { showError, showSuccess } from "~/utils/toastfy/toasts";
import { CreateProductSchema } from "~/utils/schemas/Product/CreateProductSchema";
import { ActionButton } from "~/components/Buttons/Action";
import { Product } from "@prisma/client";
import { AxiosError } from "axios";

interface Props {
  children?: ReactNode;
  isVisible?: boolean;
  item: Product;
}

export const EditModal = ({ children, item }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { menu } = useMenu();

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleChange(value: boolean) {
    setIsOpen(value);
  }

  async function handleSubmit(data: any, { reset }: FormHelpers) {
    try {
      const validated = await CreateProductSchema.validate(data);

      await ProductServices.update(item.id, {
        name: validated.name,
        price: validated.price,
        active: true,
        category: {
          connect: {
            id: validated.category,
          },
        },
        desc: validated.desc,
        quantity: validated.quantity,
      });

      showSuccess("Produto criado com sucesso!");
      reset();
      handleClose();
    } catch (err: any) {
      if (err instanceof AxiosError) {
        showError(err.message);
        console.log(err.response?.data);
      } else {
        showError(err.message);
      }
    }
  }

  return (
    <>
      <ActionButton onClick={handleOpen}>{children}</ActionButton>
      <Modal isVisible={isOpen} onChange={handleChange}>
        <Card className="flex flex-col -translate-y-20 space-y-4 justify-center items-center relative px-2 pb-2">
          <div className="flex w-full items-center py-3 px-3 border-b">
            <span>Editar Produto</span>
            <Close asChild className={styles.close}>
              <div>
                <IoMdClose />
              </div>
            </Close>
          </div>

          <Form
            ref={formRef}
            className="flex flex-col p-2 px-5 w-full space-y-2"
            onSubmit={handleSubmit}
          >
            <div className="flex space-x-2">
              <Input name="name" label="Nome" defaultValue={item.name} />
              <Select
                className="pb-2 w-full"
                name="category"
                defaultValue={`${item.categoryId}`}
                options={(menu?.categories || []).map((item) => ({
                  name: item.name,
                  value: `${item.id}`,
                }))}
                label="Categoria"
              />
            </div>

            <div className="flex space-x-2 pb-2">
              <Input
                name="price"
                label="Preço"
                defaultValue={Number(item.price)}
                type={"number"}
                step={0.01}
              />
              <Input
                name="quantity"
                type={"number"}
                step={1}
                defaultValue={item.quantity}
                label="Estoque"
              />
            </div>

            <Input
              name="desc"
              label="Descrição"
              defaultValue={item.desc || ""}
              as={"textarea"}
            />

            <div className="flex w-full justify-end space-x-2 pt-2">
              <Button
                className="!bg-red-500 hover:!bg-red-600 !text-white"
                onClick={handleClose}
                type="button"
              >
                Cancelar
              </Button>
              <Button className="!bg-emerald-500 hover:!bg-emerald-600 !text-white">
                Salvar
              </Button>
            </div>
          </Form>
        </Card>
      </Modal>
    </>
  );
};
