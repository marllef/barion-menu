import { Tabs } from "@radix-ui/react-tabs";
import { Form } from "@unform/web";
import { Button } from "~/components/Buttons/Button";
import { Input } from "~/components/Inputs/Input";
import { Select } from "~/components/Inputs/Select";
import { TabContent } from "~/components/Tabs/Content";
import { List } from "@radix-ui/react-tabs";
import { useRef, useState } from "react";
import { FormHandles, FormHelpers } from "@unform/core";
import { showError, showSuccess } from "~/utils/toastfy/toasts";
import { Tab } from "~/components/Tabs/Tab";
import { useMenu } from "~/hooks/useMenu";
import { CategoryServices } from "~/services/CategoryServices";
import { CreateCategorySchema } from "~/utils/schemas/Category/CreateCategorySchema";
import { useAuth } from "~/hooks/useAuth";

interface Props {
  onClose?: { (): void };
  onOpen?: { (): void };
}

export const CreateCategoryForm = ({ onClose = () => {} }: Props) => {
  const formRef = useRef<FormHandles>(null);
  const [currentTab, setCurrentTab] = useState("category");
  const { user } = useAuth();

  async function handleSubmit(data: any, { reset }: FormHelpers) {
    try {
      const validated = await CreateCategorySchema.validate(data);

      await CategoryServices.create(validated);

      showSuccess("Categoria criada com sucesso!");
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
    <Tabs className="w-full px-2 " value={currentTab} defaultValue="category">
      <List className="text-sm mb-5 border-b">
        <Tab value="category" onClick={setCurrentTab}>
          Categoria
        </Tab>
      </List>

      <Form
        ref={formRef}
        className="flex flex-col p-2 w-full space-y-2"
        onSubmit={handleSubmit}
      >
        <TabContent className="space-y-2 outline-none" tab="category">
          <div className="flex space-x-2">
            <Input name="name" label="Nome" />
            <Select
              className="pb-2 w-full"
              name="menuId"
              options={(user?.menu || []).map((item) => ({
                name: item.name,
                value: `${item.id}`,
              }))}
              label="Menu"
            />
          </div>

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
