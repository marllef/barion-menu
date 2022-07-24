import { Tabs } from "@radix-ui/react-tabs";
import { Form } from "@unform/web";
import { Button } from "~/components/Buttons/Button";
import { Input } from "~/components/Inputs/Input";
import { Select } from "~/components/Inputs/Select";
import { TabContent } from "~/components/Tabs/Content";
import { List } from "@radix-ui/react-tabs";
import { useRef, useState } from "react";
import { FormHandles, FormHelpers } from "@unform/core";
import { MenuWithCategories } from "~/interfaces/api/APIMenu";
import { useFetch } from "~/hooks/useFetch";
import { useAuth } from "~/hooks/useAuth";
import { ProductServices } from "~/services/ProductServices";
import { showError, showSuccess } from "~/utils/toastfy/toasts";
import { Tab } from "~/components/Tabs/Tab";
import { useMenu } from "~/hooks/useMenu";
import { CreateProductSchema } from "~/utils/schemas/Product/CreateProductSchema";

interface Props {
  onClose?: { (): void };
  onOpen?: { (): void };
  
}

export const CreateProduct = ({ onClose = () => {} }: Props) => {
  const formRef = useRef<FormHandles>(null);
  const [currentTab, setCurrentTab] = useState("product");
  const { menu } = useMenu();

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
      onClose();
    } catch (err: any) {
      showError(err.message);
    }
  }

  function handleCancel() {
    formRef.current?.reset();
  }

  return (
    <Tabs className="w-full px-2 " value={currentTab} defaultValue="product">
      <List className="text-sm mb-5 border-b">
        <Tab value="product" onClick={setCurrentTab}>
          Produto
        </Tab>

        <Tab value="promo" disabled onClick={setCurrentTab}>
          Promoção
        </Tab>
      </List>

      <Form
        ref={formRef}
        className="flex flex-col p-2 w-full space-y-2"
        onSubmit={handleSubmit}
      >
        <TabContent className="space-y-2 outline-none" tab="product">
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
              className="!bg-slate-100 hover:!bg-slate-200 !text-slate-600"
              onClick={handleCancel}
              type="button"
            >
              Limpar
            </Button>
            <Button>Adicionar</Button>
          </div>
        </TabContent>
      </Form>
    </Tabs>
  );
};
