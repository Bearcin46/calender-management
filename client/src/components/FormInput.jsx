import React from "react";

const FormInput = ({
  type = "text",
  error,
  placeholder,
  name,
  label,
  register,
}) => {
  return (
    <div className="flex flex-col mb-4 gap-2">
      <label htmlFor={name} className="font-semibold text-white">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        {...register}
        className="px-5 py-2 rounded-sm"
      />
      {error && <small>{error.message}</small>}
    </div>
  );
};

export default FormInput;
