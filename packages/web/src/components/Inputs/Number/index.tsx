import { useField } from "@unform/core";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

interface Props {
  name: string;
}

export const NumberInput = ({ name }: Props) => {
  const [value, setValue] = useState<number>(1);

  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: () => {
        return value;
      },
      setValue: (ref, value) => {
        setValue(value);
      },
      clearValue: (ref) => {
        setValue(1);
      },
    });
  }, [fieldName, registerField]);

  function handleMinus() {
    setValue((old) => (old - 1 > 0 ? old - 1 : old));
  }

  function handlePlus() {
    setValue((old) => (old + 1 > 100 ? old : old + 1));
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nValue = Number(event.currentTarget.value);
    if (nValue === 0) setValue(0);
    if (nValue < 100 && nValue >= 0) setValue(nValue);
  }

  return (
    <div className="flex w-fit h-10 border rounded">
      <span
        className="flex p-2 text-sky-500 hover:text-sky-700 justify-center items-center cursor-pointer"
        onClick={handleMinus}
      >
        <FaMinus />
      </span>
      <input
        ref={inputRef}
        type={"number"}
        value={value}
        disabled
        min={1}
        max={100}
        defaultValue={defaultValue}
        onChange={handleChange}
        className="w-16 outline-none text-center text-slate-800 disabled:bg-white text-lg"
      />
      <span
        className="flex p-2 text-sky-500 hover:text-sky-700 justify-center items-center cursor-pointer"
        onClick={handlePlus}
      >
        <FaPlus />
      </span>
    </div>
  );
};
