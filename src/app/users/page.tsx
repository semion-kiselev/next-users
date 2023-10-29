import { Users } from "@/domain/users/components/users";
import { User } from "@/domain/users/types";
import { getCookiesString } from "@/utils/get-cookies-string";

const getUsers = async (): Promise<User[]> => {
  const res = await fetch(`${process.env.BASE_URL}/api/users`, {
    cache: "no-store",
    headers: {
      cookie: getCookiesString(),
    },
  });
  if (!res.ok) {
    const error = await res.json();
    console.log(error.status);
    // todo: add error screen
    throw new Error(error);
  }
  return res.json();
};

export default async function UsersPage() {
  const users = await getUsers();
  console.log("GET USERS");

  return (
    <main className="p-4">
      <Users users={users} />
    </main>
  );
}
