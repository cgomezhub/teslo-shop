import { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];

  onSizeChange: (size: Size) => void;
}

export const SideSelector = ({ selectedSize, availableSizes,onSizeChange }: Props) => {
  return (
    <div className="my-5 ">
      <h3 className="font-bold mb-4 "> Tallas disponibles </h3>

      <div className="flex flex-wrap gap-2">
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={clsx("btn-secondary", {
              "underline": size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
