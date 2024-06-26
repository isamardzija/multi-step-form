import { FormContext } from "./FormContext";
import { useContext } from "react";
export const Inputs = () => {
  const context = useContext(FormContext);
  const { register, handleStepSubmit } = context;

  return (
    <form className="flex flex-col gap-8" onSubmit={handleStepSubmit}>
      <div className="flex flex-col gap-2">
        <label className="text-gray-800" htmlFor="age">
          Starost:
        </label>
        <input
          className="rounded-md border-gray-400"
          type="number"
          name="age"
          id="age"
          {...register("age", { required: true, min: 23, max: 50 })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-gray-800" htmlFor="height">
          Visina (u cm):
        </label>
        <input
          className="rounded-md border-gray-400"
          type="number"
          name="height"
          id="height"
          {...register("height", { required: true, min: 130, max: 250 })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-gray-800" htmlFor="weight">
          Težina (u kg):
        </label>
        <input
          className="rounded-md border-gray-400"
          type="number"
          name="weight"
          id="weight"
          {...register("weight", { required: true, min: 50, max: 250 })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <fieldset className="flex flex-col gap-2">
          <legend className="text-gray-800 pb-2">
            Koristite li duhanske proizvode?
          </legend>
          <div className="flex gap-2  items-center py-2 px-4 rounded-md hover:cursor-pointer hover:bg-neutral-200 has-[:checked]:bg-sky-200 has-[:checked]:border-sky-400 has-[:checked]:border">
            <input
              className="appearance-none checked:text-sky-600  hover:cursor-pointer"
              type="radio"
              name="smokerYes"
              id="smokerYes"
              value={true}
              {...register("smoker", { required: true })}
            />
            <label
              className="basis-full hover:cursor-pointer"
              htmlFor="smokerYes">
              Da
            </label>
          </div>
          <div className="flex gap-2 items-center py-2 px-4 rounded-md hover:cursor-pointer hover:bg-neutral-200 has-[:checked]:bg-sky-200 has-[:checked]:border-sky-400 has-[:checked]:border">
            <input
              className="appearance-none checked:text-sky-600  hover:cursor-pointer"
              type="radio"
              name="smokerNo"
              id="smokerNo"
              value={false}
              {...register("smoker")}
            />
            <label
              className="basis-full hover:cursor-pointer"
              htmlFor="smokerNo">
              Ne
            </label>
          </div>
        </fieldset>
      </div>

      <button
        className="bg-sky-500 uppercase border border-bg-sky-500 text-white px-8 py-4 rounded-md hover:bg-sky-600"
        type="submit">
        Izračunaj
      </button>
    </form>
  );
};
