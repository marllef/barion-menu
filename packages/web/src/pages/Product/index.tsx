import { Product } from "@prisma/client";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "~/hooks/useFetch";
import { MdArrowBack as Arrow } from "react-icons/md";
import { BRL } from "~/utils/currency";
import { NumberInput } from "~/components/Inputs/Number";
import { Form } from "@unform/web";
import { Button } from "~/components/Buttons/Button";
import { useMenu } from "~/hooks/useMenu";
import { useEffect, useState } from "react";
import { ProductServices } from "~/services/ProductServices";
import { showError } from "~/utils/toastfy/toasts";

export const ProductPage = () => {
  const [data, setData] = useState<Product>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      ProductServices.find(Number(id))
        .then((product) => {
          setData(product);
        })
        .catch((err) => showError(err.message));
    }
  }, [id, setData]);

  return (
    <div className="relative w-full h-full">
      <div className="flex relative bg-sky-300 h-40 justify-center items-center text-2xl font-semibold select-none">
        <div
          onClick={() => navigate(-1)}
          className="flex w-10 h-10 rounded-full text-sky-400 hover:text-sky-600 bg-white p-2 justify-center items-center absolute top-3 left-3 cursor-pointer"
        >
          <Arrow />
        </div>
      </div>

      <div className="md:max-w-3xl mx-auto px-2">
        <div className="p-2">
          <h3 className="font-semibold text-2xl text-slate-800 line-clamp-2 py-2">
            {data?.name}
          </h3>
          <p className="text-slate-600 pb-2">{data?.desc}</p>
          <div className="border-t border-b rounded text-slate-600 px-2 py-3">
            <span className="p-1 bg-slate-100 rounded text-sm">
              Vegetariano
            </span>
          </div>
          <div className="w-fit bg-slate-100 text-slate-700 font-bold rounded px-2 py-1 mt-2">
            {BRL(data?.price)}
          </div>
        </div>

        {false && (
          <div className="flex flex-col items-start justify-center bg-slate-100 w-full py-3 px-4">
            <div className="text-slate-700 text-lg capitalize">
              Escolha seu Pão
            </div>
            <div className="text-slate-500 text-sm">Escolha até 1 opção.</div>
          </div>
        )}

        <div className="fixed w-full  bottom-0 border-t left-0 p-2 select-none">
          <Form
            className="flex w-full md:max-w-3xl mx-auto justify-between space-x-2"
            onSubmit={() => {}}
          >
            <NumberInput name="qtd" />
            <Button className="w-full">Adicionar</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
