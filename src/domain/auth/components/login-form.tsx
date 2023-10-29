"use client";

import { useForm, Controller } from "react-hook-form";
import { loginApi } from "@/domain/auth/api/client";

type Form = {
  email: string;
  password: string;
};

const initialValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const formUtils = useForm<Form>({
    mode: "onSubmit",
    defaultValues: initialValues,
    shouldFocusError: false,
  });

  const handleSend = () => {
    formUtils.handleSubmit((values) => {
      loginApi(values)
        .then(() => {
          // todo: navigate to page user came from
          window.location.href = "/";
        })
        .catch((e) => console.log("err ", e));
    })();
  };

  return (
    <div>
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
      <p>
        <button onClick={handleSend} className="bg-blue-500 p-2 text-white">
          Send
        </button>
      </p>
    </div>
  );
};
