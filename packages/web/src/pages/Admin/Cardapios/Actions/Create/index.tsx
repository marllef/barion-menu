import { Close } from "@radix-ui/react-dialog";
import { ReactNode, useRef, useState } from "react";
import { Button } from "~/components/Buttons/Button";
import { Card } from "~/components/Card";
import { IoMdClose } from "react-icons/io";
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

import styles from "./AddMenu.module.css";
import { CreateMenuDTO, CreateMenuSchema } from "./CreateMenuSchema";
import { MenuServices } from "~/services/MenuServices";
import { useStore } from "~/hooks/useStore";

interface Props {
  children?: ReactNode;
  isVisible?: boolean;
}

export const CreateModal = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { menu } = useMenu();
  const { store } = useStore();

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleChange(value: boolean) {
    setIsOpen(value);
  }

  async function handleSubmit(data: CreateMenuDTO, { reset }: FormHelpers) {
    try {
      const validated = await CreateMenuSchema.validate(data);

      await MenuServices.create({
        name: validated.name,
        store: {
          connect: {
            id: validated.storeId,
          },
        },
      });

      showSuccess("Cardápio criado com sucesso!");
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
        {children}
      </Button>
      <Modal isVisible={isOpen} onChange={handleChange}>
        <Card className="flex flex-col -translate-y-20 space-y-4 justify-center items-center relative px-2 pb-2">
          <div className="flex w-full items-center py-3 px-3 border-b">
            <span>Adicionar Cardápio</span>
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
            </div>

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
