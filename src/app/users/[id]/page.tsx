import { Permission } from "@/domain/permissions/types";
import { UserForm } from "@/domain/users/components/user-form";
import { GetUserParamsType, User } from "@/domain/users/types";
import { getCookiesString } from "@/utils/get-cookies-string";

const getPermissions = async (): Promise<Permission[]> => {
  const res = await fetch(`${process.env.BASE_URL}/api/permissions`, {
    cache: "no-store",
  });
  if (!res.ok) {
    const error = await res.json();
    console.log(error);
    // todo: add error screen
    throw new Error("Failed to fetch users");
  }
  return res.json();
};

const getUser = async (id: number): Promise<User> => {
  const res = await fetch(`${process.env.BASE_URL}/api/users/${id}`, {
    cache: "no-store",
    headers: {
      cookie: getCookiesString(),
    },
  });
  if (!res.ok) {
    const error = await res.json();
    console.log(error);
    // todo: add error screen
    throw new Error("Failed to fetch users");
  }
  return res.json();
};

export default async function UpdateUserPage({
  params,
}: {
  params: { id: string };
}) {
  console.log("UPDATE");
  const user = await getUser(Number(params.id));
  const permissions = await getPermissions();
  return (
    <main className="p-4">
      <UserForm permissionsList={permissions} user={user} />
    </main>
  );
}
