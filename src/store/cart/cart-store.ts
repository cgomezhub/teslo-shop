import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware"; // middleware para persistir el estado en el local storage

interface State {
  cart: CartProduct[];

  // methods 

  getSummaryInformation(): {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };

  addProductToCart: (product: CartProduct) => void;

  updateProductQuantity: (product: CartProduct, quantity: number) => void;

  removeProductFromCart: (product: CartProduct) => void;

  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getSummaryInformation() {
        const { cart } = get();

        const subTotal = cart.reduce(
          (subtotal, p) => subtotal + p.price * p.quantity,
          0
        );

        const tax = subTotal * 0.15;

        const total = subTotal + tax;

        const itemsInCart = cart.reduce((total, p) => total + p.quantity, 0);

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // si el producto ya esta en el carrito coin la talla seleccionada
        const existingProduct = cart.some(
          (p) => p.id === product.id && p.size === product.size
        );
        // si no esta en el carrito lo agrega
        if (!existingProduct) {
          set({ cart: [...cart, product] });
          return;
        }
        // si ya esta en el carrito por size aumenta la cantidad
        const newCart = cart.map((p) => {
          if (p.id === product.id && p.size === product.size) {
            return { ...p, quantity: p.quantity + product.quantity };
          }
          return p;
        });
        set({ cart: newCart });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get();
        const newCart = cart.filter(
          (p) => !(p.id === product.id && p.size === product.size)
        );
        set({ cart: newCart });
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "cart",
    }
  )
);
