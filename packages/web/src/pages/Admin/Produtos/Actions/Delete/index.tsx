import { ReactNode, useState } from "react";
import { ActionButton } from "~/components/Buttons/Action";
import { Button } from "~/components/Buttons/Button";
import { Card } from "~/components/Card";
import { Modal } from "~/components/Modals/Modal";

interface Props {
  name: string;
  children?: ReactNode;
  onClick?: { (): void };
  onConfirm?: { (): void };
}

export const DeleteProductModal = (props: Props) => {
  const { children, onClick, name, onConfirm = () => {} } = props;

  const [visible, setVisible] = useState(false);

  function open() {
    setVisible(true);
  }

  function close() {
    setVisible(false);
  }

  function handleConfirm() {
    onConfirm();
    close();
  }

  return (
    <>
      <ActionButton children={children} variant="red" onClick={open} />
      <Modal isVisible={visible} onChange={setVisible}>
        <Card className="flex flex-col p-3 space-y-2 max-w-sm">
          <h2 className=" pb-2 border-b text-center text-slate-800 font-bold">
            Deletar {name}
          </h2>
          <div className=" space-y-2 text-slate-800 py-1 px-2">
            <div className="text-start">
              Tem certeza que deseja deletar este produto?
            </div>
            <div className="text-center text-sm text-red-500">
              Atenção: Esta ação é <strong className="">irreversível</strong>!
            </div>

            <div className="flex justify-end items-center w-full space-x-2 pt-2">
              <Button className="!bg-red-500 hover:!bg-red-600" onClick={close}>
                Cancelar
              </Button>
              <Button onClick={handleConfirm}>Confirmar</Button>
            </div>
          </div>
        </Card>
      </Modal>
    </>
  );
};
