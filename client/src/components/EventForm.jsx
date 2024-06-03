import React, { useState } from "react";
import FormInput from "./FormInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(20, { message: "Title must be at most 20 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" })
    .max(50, { message: "Description must be at most 50 characters" }),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time" }),
  duration: z.string().min(1, { message: "Enter the duration" }),
  sessionNotes: z.string().min(5, { message: "Must be 5 or more characters" }),
  participants: z.string().min(5, { message: "Must be 5 or more characters" }),
});

const EventForm = ({ closeForm, fetchEvents }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(formSchema) });

  const formSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/events/create",
        data
      );
      setMessage("Event created successfully");
      fetchEvents();
      reset();
      setLoading(false);
    } catch (error) {
      setMessage("Error creating event");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-blue-800 text-center font-bold text-3xl">
        EVENT DETAILS
      </h1>
      {message && (
        <div className="text-center mb-4 text-red-500">{message}</div>
      )}
      <form onSubmit={handleSubmit(formSubmit)}>
        <FormInput
          type="text"
          label="Title"
          name="title"
          placeholder="Enter title"
          error={errors.title}
          register={register}
        />
        <FormInput
          type="text"
          label="Description"
          name="description"
          placeholder="Enter the description"
          error={errors.description}
          register={register}
        />
        <FormInput
          type="text"
          label="Participants"
          name="participants"
          placeholder="Enter the participants"
          error={errors.participants}
          register={register}
        />
        <FormInput
          type="date"
          label="Date"
          name="date"
          placeholder="Enter the date"
          error={errors.date}
          register={register}
        />
        <FormInput
          type="time"
          label="Time"
          name="time"
          placeholder="Enter the time"
          error={errors.time}
          register={register}
        />
        <FormInput
          type="number"
          label="Duration"
          name="duration"
          placeholder="Enter the duration in hours"
          error={errors.duration}
          register={register}
        />
        <FormInput
          type="text"
          label="Session Notes"
          name="sessionNotes"
          placeholder="Enter the session notes"
          error={errors.sessionNotes}
          register={register}
        />
        <div className="flex items-center mt-4 gap-5">
          <button
            type="submit"
            className="px-5 py-2 text-black ring-2 ring-black bg-white rounded-xl"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
          <button
            type="button"
            className="px-5 py-2 ring-2 ring-white bg-red-800 text-white rounded-xl"
            onClick={closeForm}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
