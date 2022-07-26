import { Close, Title } from "@radix-ui/react-dialog";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "~/components/Buttons/Button";
import { Card } from "~/components/Card";
import { IoMdClose } from "react-icons/io";
import styles from "./AddProduct.module.css";
import { Modal } from "~/components/Modals/Modal";
import { Input } from "~/components/Inputs/Input";
import { Select } from "~/components/Inputs/Select";
import { Form } from "@unform/web";
import { FormHandles, FormHelpers } from "@unform/core";
import { showError, showSuccess } from "~/utils/toastfy/toasts";
import { AxiosError } from "axios";
import { CreateProductSchema } from "~/utils/schemas/Product/CreateProductSchema";
import { ProductServices } from "~/services/ProductServices";
import { useMenu } from "~/hooks/useMenu";

interface Props {
  children?: ReactNode;
  isVisible?: boolean;
}

export const CreateModal = ({ children }: Props) => {
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

      await ProductServices.create({
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
      <Button onClick={handleOpen} className="uppercase">
        Adicionar
      </Button>
      <Modal isVisible={isOpen} onChange={handleChange}>
        <Card className="flex flex-col -translate-y-20 space-y-4 justify-center items-center relative px-2 pb-2">
          <div className="flex w-full items-center py-3 px-3 border-b">
            <span>Adicionar Produto</span>
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
              <Input name="name" label="Nome" />
              <Select
                className="pb-2 w-full"
                name="category"
                options={(menu?.categories || []).map((item) => ({
                  name: item.name,
                  value: `${item.id}`,
                }))}
                label="Categoria"
              />
            </div>

            <div className="flex space-x-2 pb-2">
              <Input name="price" label="Preço" type={"number"} step={0.01} />
              <Input name="quantity" type={"number"} step={1} label="Estoque" />
            </div>

            <Input name="desc" label="Descrição" as={"textarea"} />

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
