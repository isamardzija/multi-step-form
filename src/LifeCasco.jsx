import { FormContext, FormProvider } from "./FormContext";
import { useContext } from "react";

import { Step } from "./Step";
import { Inputs } from "./Inputs";
import { Results } from "./Results";
import { EmailModal } from "./EmailModal";

export const MultiStepForm = () => {
  const context = useContext(FormContext);
  return (
    <div className="rounded-sm border-t-4 border-t-sky-500 shadow-2xl bg-stone-50 p-8 text-xl max-w-xl mx-auto min-h-[500px]">
      {context.currentStep < 5 && <Step />}
      {context.currentStep === 5 && <Inputs />}
      {context.currentStep === 6 && <Results />}
      {context.currentStep === 7 && <EmailModal />}
    </div>
  );
};

export const LifeCasco = () => {
  return (
    <FormProvider>
      <MultiStepForm />
    </FormProvider>
  );
};
