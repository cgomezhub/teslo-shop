"use client";

import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { login, registerUser } from "@/actions";

import { useForm, SubmitHandler } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {

  const [errorMessage, setErrorMessage] = useState('');
  const [messageColor, setMessageColor] = useState("text-red-500"); 

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {

    setErrorMessage('');
    const { name, email, password } = data;

    const resp =  await registerUser(name, email, password);

    if(!resp.ok){
      setErrorMessage(resp.msg);
      return;
    }
    setErrorMessage(resp.msg);
    if (resp.msg.toLowerCase().includes("correctamente")) {
      setMessageColor("text-green-500");
    }
    // console.log({resp});
    // authenticate user
    await login (email.toLocaleLowerCase(), password);

    window.location.replace('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="email">Nombre completo</label>

      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-800": errors.name,
        })}
        type="text"
        {...register("name", { required: true })}
        autoFocus
      />
      <label htmlFor="email">Correo Electronio </label>

      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-800": errors.email,
        })}
        type="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        autoFocus
        placeholder="tuemail@mail.com"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-800": errors.password,
        })}
        type="password"
        {...register("password", { required: true, minLength: 6 })}
        autoFocus
        placeholder="minimo 6 caracteres"
      />

      {errorMessage && <p className ={`${messageColor} text-center mb-2`}>{errorMessage}</p>}

      <button type="submit" className="btn-primary">
        Crear cuenta
      </button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
};
