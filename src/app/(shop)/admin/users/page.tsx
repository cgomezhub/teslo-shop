import { getPaginatedUsers } from "@/actions";
import { Title } from "@/components";

import { redirect } from "next/navigation";
import { UserTable } from "./ui/UserTable";


export default async function () {

  //! server action: toda la info de la orden viende de la base de datos
  const { ok, users = [] } = await getPaginatedUsers();


  if (!ok) {
    redirect("/auth/login");
  }

  //Todo: se podria Implementar la paginación como se hizo en products
  // Todo: se podria implemetar una caja de texto y mandar eso a buscar por nombre en prisma


  return (
    <>
      <Title title="Mantenimieno de usuarios" />
      <UserTable users={users}/>    
    </>
  );
}
