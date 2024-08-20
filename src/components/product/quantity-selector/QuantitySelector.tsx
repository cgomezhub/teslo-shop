'use client';

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  OnQuantityChange: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity,OnQuantityChange }: Props) => {
  

    const onValueChage = (value:number) => {
        if (quantity + value < 1) {
            return;
        }
        OnQuantityChange(quantity + value)

    }
  return (
    <div className="flex ">
      <button onClick={ () => onValueChage(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className=" w-20 mx-3 my-2 px-5 bg-gray-100 text-center rounded">{quantity}</span>
      <button onClick={() => onValueChage(+1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
