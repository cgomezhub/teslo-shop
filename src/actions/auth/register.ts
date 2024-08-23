"use server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password, 10),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      msg: "Usuario creado correctamente",
      user,
    };
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      msg: "Error al registrar el usuario",
    };
  }
};
