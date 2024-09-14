"use client";

import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ amount, orderId }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const rountedAmount = (Math.round(amount * 100) / 100).toFixed(2); // redondea

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: `${rountedAmount}`,
            currency_code: "USD",
          },
        },
      ],
    });

    //  console.log({ transactionId });

    const resp = await setTransactionId(transactionId, orderId);

    // console.log({ resp });

    if (!resp.ok) {
      throw new Error(`${resp.message}`);
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();

    // console.log({ details });

    if (!details) {
      throw new Error("no se pudo capturar el pago");
      return;
    }

    await paypalCheckPayment(details.id as string);
  };

  return (
    <>
      {isPending ? (
        <div className="animate-pulse mb-8">
          <div className="h-10 bg-gray-200 w-full rounded-md"></div>
          <div className="h-10 bg-gray-200 w-full rounded-md mt-2"></div>
        </div>
      ) : (
        <div className= "relative z-0"> 
          <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </div>
      )}
    </>
  );
};
