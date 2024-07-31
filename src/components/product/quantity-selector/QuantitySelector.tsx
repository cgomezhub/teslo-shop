'use client';

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  // setQuantity: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity }: Props) => {
    const [count, setCount] = useState(quantity);

    const onQuantityChage = (value:number) => {
        if (count + value < 1) {
            return;
        }
        setCount(count + value)

    }
  return (
    <div className="flex ">
      <button onClick={ () => onQuantityChage(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className=" w-20 mx-3 my-2 px-5 bg-gray-100 text-center rounded">{count}</span>
      <button onClick={() => onQuantityChage(+1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
