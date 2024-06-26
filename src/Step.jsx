import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FormContext } from "./FormContext";

export const Step = () => {
  const context = useContext(FormContext);
  const {
    setError,
    formState: { errors },
  } = useForm();
  const { currentStep, data, register, handleStepSubmit, prevStep } = context;

  let stepData;
  if (currentStep === 1) {
    stepData = data.questionnaire.stepOne;
  }
  if (currentStep === 2) {
    stepData = data.questionnaire.stepTwo;
  }
  if (currentStep === 3) {
    stepData = data.questionnaire.stepThree;
  }
  if (currentStep === 4) {
    stepData = data.questionnaire.stepFour;
  }

  return (
    <form onSubmit={handleStepSubmit} className="flex flex-col justify-between">
      <fieldset>
        <legend className="pb-4 font-bold">{stepData.question}</legend>
        <div className="flex flex-col gap-4">
          {stepData.options.map((option, i) => (
            <div
              key={i}
              className="flex gap-2  items-center py-2 px-4 rounded-md hover:cursor-pointer hover:bg-neutral-200 has-[:checked]:bg-sky-200 has-[:checked]:border-sky-400 has-[:checked]:border">
              <input
                className="appearance-none checked:text-sky-600 hover:cursor-pointer"
                value={option.value}
                type="radio"
                name={stepData.name}
                id={option.value}
                {...register(`${stepData.name}`, {
                  required: "Za nastavak odaberite jedan od odgovora.",
                })}
              />
              <label className="hover:cursor-pointer" htmlFor={option.value}>
                {option.answer}
              </label>
            </div>
          ))}
          {/* Ovdje želim prikazati poruku ako dođe do pogreške prilikom submita. Mislim da je problem što ova komponenta uopće ne vidi "errors" objekt, jer svu logiku oko forme držim u contextu. */}
          {errors[`${data.name}`] && (
            <p>Potrebno je odabrati jedan od odgovora.</p>
          )}
        </div>
      </fieldset>
      <div className="flex pt-6">
        {currentStep > 1 && (
          <button
            onClick={prevStep}
            type="button"
            className="uppercase text-gray-600 px-8 py-4 rounded-md border border-gray-200 hover:bg-gray-200">
            Natrag
          </button>
        )}
        <button
          className="mr-0 ml-auto bg-sky-500 uppercase border border-bg-sky-500 text-white px-8 py-4 rounded-md hover:bg-sky-600"
          type="submit">
          Dalje
        </button>
      </div>
    </form>
  );
};
