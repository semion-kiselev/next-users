"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Permission } from "@/domain/permissions/types";
import { createUsersApi, updateUsersApi } from "@/domain/users/api/client";
import { User } from "@/domain/users/types";

type Form = {
  name: string;
  email: string;
  password: string;
  permissions: string[];
};

type Props = {
  permissionsList: Permission[];
  user?: User;
};

const getChangedValues = (initialValues: Form, values: Form) => {
  return Object.fromEntries(
    Object.entries(values).filter(([key, value]) => {
      const field = key as keyof Form;
      const initialValue = initialValues[field];

      if (Array.isArray(value) && Array.isArray(initialValue)) {
        return (
          [...value].sort().toString() !== [...initialValue].sort().toString()
        );
      }

      return value !== initialValues[key as keyof Form];
    }),
  );
};

export const UserForm = ({ permissionsList, user }: Props) => {
  const router = useRouter();

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    permissions: [],
  };

  const formUtils = useForm<Form>({
    mode: "onSubmit",
    defaultValues: initialValues,
    shouldFocusError: false,
  });

  const handleSend = () => {
    formUtils.handleSubmit((values) => {
      if (user) {
        const changedValues = getChangedValues(initialValues, values);
        if (Object.keys(changedValues).length === 0) {
          return;
        }
        updateUsersApi(user.id, changedValues)
          .then(() => {
            router.push("/users");
            // router.refresh();
          })
          .catch((e) => console.log("err ", e));
        return;
      }
      createUsersApi(values)
        .then(() => {
          router.push("/users");
          router.refresh();
        })
        .catch((e) => console.log("err ", e));
    })();
  };

  return (
    <div>
      <h3>
        {user ? "Update" : "Create"} user{user && ` ${user.name}`}
      </h3>
      <div>
        <p className="mb-3">
          <label htmlFor="email" className="block">
            Name:
          </label>
          <Controller
            control={formUtils.control}
            name="name"
            render={({ field }) => (
              <input
                type="text"
                className="border-2 border-gray-600 px-2 w-60"
                {...field}
              />
            )}
          />
        </p>
        <p className="mb-3">
          <label htmlFor="email" className="block">
            Email:
          </label>
          <Controller
            control={formUtils.control}
            name="email"
            render={({ field }) => (
              <input
                type="text"
                className="border-2 border-gray-600 px-2 w-60"
                {...field}
              />
            )}
          />
        </p>
        {!user && (
          <p className="mb-3">
            <label htmlFor="password" className="block">
              Password:
            </label>
            <Controller
              control={formUtils.control}
              name="password"
              render={({ field }) => (
                <input
                  type="text"
                  className="border-2 border-gray-600 px-2  w-60"
                  {...field}
                />
              )}
            />
          </p>
        )}
        <p className="mb-3">
          <label htmlFor="password" className="block">
            Permissions:
          </label>
          <Controller
            control={formUtils.control}
            name="permissions"
            render={({ field }) => (
              <select
                multiple
                className="border-2 border-gray-600 px-2  w-60"
                value={field.value}
                onChange={({ target: { selectedOptions } }) => {
                  field.onChange(
                    Array.from(selectedOptions, (option) => option.value),
                  );
                }}
                onBlur={field.onBlur}
              >
                {permissionsList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            )}
          />
        </p>
        <p>
          <button onClick={handleSend} className="bg-blue-500 p-2 text-white">
            {user ? "Update" : "Create"}
          </button>
        </p>
      </div>
    </div>
  );
};
