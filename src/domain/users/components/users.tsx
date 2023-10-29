"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUsersApi } from "@/domain/users/api/client";
import { deleteUsersApi } from "@/domain/users/api/client";
import { User } from "@/domain/users/types";

type Props = {
  users?: User[];
};

export const Users = ({ users: initialUsers }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [users, setUsers] = useState<User[] | null>(initialUsers || null);

  useEffect(() => {
    if (!initialUsers) return;
    setUsers(initialUsers);
  }, [initialUsers]);

  // const { data, isRefetching, isLoading, error } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: getUsersApi,
  //   initialData: users,
  //   staleTime: 100,
  // });

  // console.log("are users loading ", isLoading);
  // console.log("are users isRefetching ", isRefetching);
  // console.log({ error });

  useEffect(() => {
    console.log("MOUNT USERS ", users);
    if (users) return;
    getUsersApi().then((users) => setUsers(users));
  }, [users]);

  const handleDelete = async (id: number) => {
    await deleteUsersApi(id);
    // router.refresh();
    // await queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const handleUpdate = (id: number) => {
    router.push(`/users/${id}`);
  };

  const handleCreate = () => {
    router.push("/users/create");
  };

  return (
    <div>
      <h3 className="flex justify-between">
        Users:{" "}
        <button className="border" onClick={handleCreate}>
          Create
        </button>
      </h3>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(users || []).map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
                <button className="ml-1" onClick={() => handleUpdate(user.id)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
