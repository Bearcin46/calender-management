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
    <div className="flex flex-col mb-4 gap-2 relative">
      <label htmlFor={name} className="font-semibold text-white">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        {...register(name)}
        className={`px-5 py-2 rounded-sm ${error ? "border-red-800" : ""}`}
      />
      {error && error.message && (
        <small className="text-xs font-semibold text-red-800">
          {error.message}
        </small>
      )}
    </div>
  );
};

export default FormInput;
