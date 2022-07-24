import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children?: ReactNode;
  isVisible?: boolean;
  onChange?: { (value: boolean): void };
  onClickOutside?: { (): void };
}

export const Modal = ({
  children,
  isVisible = false,
  onChange: onIsVisibleChange,
  onClickOutside = () => {},
}: Props) => {
  const [isOpen, setIsOpen] = useState(isVisible);

  useEffect(() => {
    setIsOpen(isVisible);
  }, [isVisible]);

  function handleClose() {
    setIsOpen(false);
  }

  function handleOpen() {
    setIsOpen(false);
  }

  function handleClickOutside(event: any) {
    event.preventDefault();
    onClickOutside();
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onIsVisibleChange}>
      <Dialog.Portal className="flex w-full h-full justify-center items-center ">
        <Dialog.Overlay className="bg-[#0007] fixed top-0 left-0 right-0 bottom-0 grid place-items-center">
          <Dialog.Content
            onPointerDownOutside={handleClickOutside}
            onEscapeKeyDown={handleClose}
            className="flex flex-col justify-center items-center"
          >
            {children}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
