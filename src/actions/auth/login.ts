"use server";

import { signIn } from "@/auth.config";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // console.log({formData: Object.fromEntries(formData)});
    // await sleep(2);

    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return "Success";
  } catch (error) {
    console.log({ error });
    if ((error as any).type === "CredentialsSignin") {
      return "CredentialsSignin";
    }
    //   throw error;
    return "UnknowError";
  }
}


// otra forma de autenticar el usuario usada cuando se gistra 
export async function login(email: string, password: string) {

  try {

    await signIn('credentials', { email, password});

    return {
      ok: true,
      msg: 'Inicio de sesión correcto'
    }

  } catch (error) {
    console.log({error});
    return {
      ok: false,
      msg: 'Error al iniciar sesión'

    }
    
  }

}
