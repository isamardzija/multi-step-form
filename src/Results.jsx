import { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormContext } from "./FormContext";
import data from "../data/life.json";
export const Results = () => {
  const context = useContext(FormContext);
  const { formData } = context;
  const { control } = useForm();
  const { register, handleStepSubmit } = context;
  const [chosenSum, setChosenSum] = useState(50000);
  const [premium, setPremium] = useState(0);
  const rates = data.calculator.ages;

  useEffect(() => {
    setPremium(Number(chosenSum) * rates[formData.age][chosenSum]);
  }, [chosenSum]);

  let pricingModel;

  if (formData.smoker === "true") {
    pricingModel = 2;
  } else if (formData.smoker === "false") {
    const bmi =
      (Number(formData.weight) /
        (Number(formData.height) * Number(formData.height))) *
      10000;

    if (bmi > 18 && bmi < 28) {
      pricingModel = 1;
    } else pricingModel = 1.15;
  }

  return (
    <div>
      <div className="text-center flex flex-col gap-4 rounded-sm bg-gray-200 p-8 justify-center items-center">
        <span>Iznos za isplatu:</span>
        <span className="text-2xl font-bold text-gray-800">{`${String(
          chosenSum
        ).slice(0, 2)}.${String(chosenSum).slice(2)} EUR`}</span>
        <span>Okvirna cijena:</span>
        <span className="text-2xl font-bold text-gray-800">
          {Math.floor((premium / 12) * 0.9)} -{" "}
          {Math.floor((premium / 12) * 1.1)} EUR mjesečno
        </span>
      </div>

      <form onSubmit={handleStepSubmit} className="py-8">
        <div className="bg-gray-100 rounded-md py-8 px-2 flex flex-col gap-4 justify-center items-center">
          <label htmlFor="chosenSum">Visina pokrića:</label>
          <Controller
            name="rangeInput"
            control={control}
            defaultValue={chosenSum}
            render={({ field }) => (
              <input
                {...register("chosenSum")}
                className="bg-gray-200 h-1 w-full"
                type="range"
                name="chosenSum"
                min={30000}
                list="sums"
                max={90000}
                step={20000}
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  setChosenSum(e.target.value);
                }}
              />
            )}
          />
          <datalist id="sums" className="flex justify-between w-full ">
            <option className="text-gray-400" value={30000}>
              |
            </option>
            <option className="text-gray-400" value={50000}>
              |
            </option>
            <option className="text-gray-400" value={70000}>
              |
            </option>
            <option className="text-gray-400" value={90000}>
              |
            </option>
          </datalist>
        </div>

        <button
          className="bg-sky-500 uppercase border border-bg-sky-500 text-white px-8 py-4 rounded-md hover:bg-sky-600"
          type="submit">
          Želim konkretnu ponudu
        </button>
      </form>
    </div>
  );
};
