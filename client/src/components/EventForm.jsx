import FormInput from "./FormInput";
import { useForm } from "react-hook-form";

const EventForm = () => {
  const {
    formState: { errors },
    register,
  } = useForm();
  return (
    <div className="max-w-2xl mx-auto ">
      <h1 className="text-blue-800 text-center font-bold text-3xl">
        EVENT DETAILS
      </h1>
      <form action="">
        {/* title */}
        <FormInput
          type={"text"}
          label={"Title"}
          name={"title"}
          placeholder={"Enter title"}
          error={errors.title}
          register={register("title")}
        />
        {/* description */}
        <FormInput
          type={"text"}
          label={"Description"}
          name={"description"}
          placeholder={"Enter the description"}
          error={errors.description}
          register={register("description")}
        />
        {/*  participants */}
        <FormInput
          type={"text"}
          label={"Participants"}
          name={"participants"}
          placeholder={"Enter the  participants"}
          error={errors.participants}
          register={register("participants")}
        />
        {/*  date */}
        <FormInput
          type={"date"}
          label={"Date"}
          name={"date"}
          placeholder={"Enter the date"}
          error={errors.date}
          register={register("date")}
        />
        {/*  time */}
        <FormInput
          type={"time"}
          label={"Time"}
          name={"time"}
          placeholder={"Enter the time"}
          error={errors.time}
          register={register("time")}
        />
        {/*  duration */}
        <FormInput
          type={"number"}
          label={"Duration"}
          name={"duration"}
          placeholder={"Enter the duration in hours"}
          error={errors.duration}
          register={register("duration")}
        />
        {/*  sessionNotes */}
        <FormInput
          type={"text"}
          label={"Session Notes"}
          name={"sessionNotes"}
          placeholder={"Enter the sessionNotes"}
          error={errors.sessionNotes}
          register={register("sessionNotes")}
        />

        <div className="flex itemscenter mt-4 gap-5">
          <button
            type="submit"
            className="px-5 py-2 text-black ring-2 ring-black bg-white rounded-xl"
          >
            Create Event
          </button>
          <button
            type="button"
            className="px-5 py-2 ring-2 ring-white bg-red-800 text-white rounded-xl"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
