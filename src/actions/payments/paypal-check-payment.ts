"use server";


import prisma from "@/lib/prisma";

import {PaypalOrderStatusResponse} from "@/interfaces"
import { revalidatePath } from "next/cache";


export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPaypalBearerToken();
  // console.log({ authToken });

  if (!authToken) {
    return {
      ok: false,
      message: " no se pudo obtener el token de verificacion ",
    };
  }

  const resp = await verifyPaypalTransaction(paypalTransactionId, authToken);

  if (!resp) {
    return {
      ok: false,
      message: " no se pudo verificar la transaccion ",
    };
  }

  const { status, purchase_units} = resp

   const { invoice_id:orderId} = purchase_units[0]

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "No se ha pagado en Paypal",
    };
  }

  // TODO: actuallizar la base de datos con el estado de la orden
  
  try {

    // console.log ({status, purchase_units});

    await prisma.order.update({
      where: { id: orderId },
    data: {

      isPaid: true,
      paidAt: new Date()
    }
    })

    revalidatePath(`/orders/${orderId}`)

    return {
      ok: true,
      message: "Pago exitoso",
    };
    
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo realizar el pago",
    };
    
  }
  





};

const getPaypalBearerToken = async () => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  //! este codigo <> siguiente se toma desde Postman/ auth ver Readme

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    // redirect: "follow", // no se necesita
  };

  try {
    const result = await fetch(oauth2Url, {
      ...requestOptions,
      cache: 'no-store'
    }).then((r) => r.json());
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPaypalTransaction = async (
  paypalTransactionId: string,
  bearerToken: string
):Promise<PaypalOrderStatusResponse|null> => {

  const paypalOrderURL = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`

  

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    // redirect: "follow", // no se necesita
  };



  try {
    
   const resp = await   fetch(paypalOrderURL,{
    ...requestOptions,
    cache: 'no-store'
   }).then((r) => r.json());
    return resp;


  } catch (error) {
    console.log(error);
    return null ;
    
  }
};
