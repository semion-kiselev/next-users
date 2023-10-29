import { Permission } from "@/domain/permissions/types";
import { UserForm } from "@/domain/users/components/user-form";

const getPermissions = async (): Promise<Permission[]> => {
  const res = await fetch(`${process.env.BASE_URL}/api/permissions`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    const error = await res.json();
    console.log(error);
    // todo: add error screen
    // throw new Error("Failed to fetch users");
  }
  return res.json();
};

export default async function CreateUserPage() {
  const permissions = await getPermissions();
  return (
    <main className="p-4">
      <UserForm permissionsList={permissions} />
    </main>
  );
}
