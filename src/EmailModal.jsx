import { FormContext } from "./FormContext";
import { useContext } from "react";

export const EmailModal = () => {
  const context = useContext(FormContext);
  const { register, handleFinalSubmit } = context;
  return (
    <form
      onSubmit={handleFinalSubmit}
      className="flex flex-col gap-6 text-gray-600">
      <p>Unesite Vaš e-mail nakon čega ćemo Vam se javiti u najkraćem roku.</p>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-gray-800">
          E-mail:
        </label>
        <input
          {...register("email", { required: true })}
          type="email"
          className="rounded-md"
          name="email"
          id="email"
        />
      </div>
      <button
        className="bg-sky-500 uppercase border border-bg-sky-500 text-white px-8 py-4 rounded-md hover:bg-sky-600"
        type="submit">
        Pošalji
      </button>
    </form>
  );
};
