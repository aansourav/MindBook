import React from "react";
import Field from "../common/Field";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

export default LoginForm;
