import { useState, createContext } from "react";
import data from "../data/life.json";
import { useForm } from "react-hook-form";

const FormContext = createContext();

function FormProvider(props) {
  const { register, handleSubmit } = useForm();

  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  const onFinalSubmit = (data) => {
    const encode = (data) => {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    };

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "life-casco-html", ...data }),
    })
      .then(() => console.log("Success", data))
      .catch((err) => console.log(err));
    updateFormData(data);
    window.alert("Upit uspješno poslan!");
    setCurrentStep(1);
  };

  const handleStepSubmit = handleSubmit(onSubmit);
  const handleFinalSubmit = handleSubmit(onFinalSubmit);

  const value = {
    data: data,
    formData: formData,
    currentStep: currentStep,
    updateFormData: updateFormData,
    nextStep: nextStep,
    prevStep: prevStep,
    register: register,
    handleStepSubmit: handleStepSubmit,
    handleFinalSubmit: handleFinalSubmit,
  };
  return (
    <FormContext.Provider value={value}>{props.children}</FormContext.Provider>
  );
}

export { FormContext, FormProvider };
