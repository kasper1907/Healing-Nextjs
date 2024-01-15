"use client";
import React from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { boolean, object, string } from "yup";
//@ts-ignore
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Select, SelectItem } from "@nextui-org/react";

interface FormData {
  username: string;
  email: string;
  password: string;
  selectOption: string;
  agreeToTerms: boolean;
}

export const animals = [
  // ... your existing animal data
];

const UserRegistrationForm: React.FC = () => {
  const validationSchema = object().shape({
    username: string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: string()
      .required("Email is required")
      .email("Invalid email address"),
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    selectOption: string().required("Please select an option"),
    agreeToTerms: boolean().oneOf([true], "Please agree to terms"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // Do something with the form data
  };

  return (
    <div className="m-auto flex w-1/2 flex-col gap-4">
      <h1 className="bold text-2xl underline">Registration Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {/* ... other form fields */}
        <div className="input-wrapper flex flex-col">
          <label htmlFor="username">Username</label>
          <Input type="text" label="Username" {...register("username")} />
          {errors.username && (
            <p className="text-xs italic text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* ... other form fields */}

        <div className="input-wrapper flex flex-col">
          <label htmlFor="email">Email</label>
          <Input type="email" label="Email" {...register("email")} />
          {errors.email && (
            <p className="text-xs italic text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* ... other form fields */}

        <div className="input-wrapper flex flex-col">
          <label htmlFor="password">Password</label>
          <Input type="password" label="Password" {...register("password")} />
          {errors.password && (
            <p className="text-xs italic text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* ... other form fields */}

        <div className="input-wrapper flex flex-col">
          <label htmlFor="selectOption">Select Option</label>
          <Controller
            name="selectOption"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Select an animal" className="w-full">
                {animals.map((animal: any) => (
                  <SelectItem key={animal.value} value={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          {errors.selectOption && (
            <p className="text-xs italic text-red-500">
              {errors.selectOption.message}
            </p>
          )}
        </div>

        {/* ... other form fields */}

        <div className="input-wrapper flex flex-col">
          <label>
            <Controller
              name="agreeToTerms"
              control={control}
              defaultValue={false}
              //@ts-ignore
              render={({ field }) => <input type="checkbox" {...field} />}
            />{" "}
            I agree to the terms and conditions
          </label>
          {errors.agreeToTerms && (
            <p className="text-xs italic text-red-500">
              {errors.agreeToTerms.message}
            </p>
          )}
        </div>

        <div className="input-wrapper">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
