import { Close, Title } from "@radix-ui/react-dialog";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "~/components/Buttons/Button";
import { Card } from "~/components/Card";
import { IoMdClose } from "react-icons/io";
import styles from "./AddProduct.module.css";
import { CreateProduct as CreateProductForm } from "~/components/Forms/Product/Create";
import { Modal } from "~/components/Modals/Modal";

interface Props {
  children?: ReactNode;
  isVisible?: boolean;
}

export const EditModal = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleChange(value: boolean) {
    setIsOpen(value);
  }

  return (
    <>
      <Button onClick={handleOpen} className="uppercase">
        Adicionar
      </Button>
      <Modal isVisible={isOpen} onChange={handleChange}>
        <Card className="flex justify-center items-center relative pt-2 pb-2">
          <Close asChild className={styles.close}>
            <div>
              <IoMdClose />
            </div>
          </Close>

          <CreateProductForm onClose={handleClose} />
        </Card>
      </Modal>
    </>
  );
};
