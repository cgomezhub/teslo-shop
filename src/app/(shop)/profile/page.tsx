import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <>
      <Title title="Perfil" />

      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      <p className="text-5xl"> {session.user.role}</p>

    </>
  );
}
