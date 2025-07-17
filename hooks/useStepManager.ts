import { SheetStep, StepParamMap } from '@/components/map/_type';
import { useState } from 'react';

// 바텀시트의 step을 관리
export const useStepManager = () => {
  const [step, setStep] = useState<SheetStep>(SheetStep.INFO);
  const [stepPayloads, updateStepPayloads] = useState<Partial<StepParamMap>>({});

  /**
   *
   * @param step 현재 step
   * @param value 업데이트할 값
   */
  const updateValue = <S extends SheetStep>(step: S, value?: StepParamMap[S]) => {
    if (value !== undefined) {
      updateStepPayloads(prev => ({
        ...prev,
        [step]: value,
      }));
    }
  };

  /**
   * 저장된 해당 단계의 value를 초기화하고 단계를 하나 뒤로
   */
  const backStep = () => {
    updateStepPayloads(prev => ({
      ...prev,
      [step]: undefined,
    }));
    setStep(prev => (prev - 1) as SheetStep);
  };

  /**
   *
   * 다음 스텝으로 이동
   * TODO : 마지막 스텝인 경우 데이터를 params로 넘기며 screen으로 이동
   */
  const nextStep = () => {
    if (step === SheetStep.SUBMIT) return;

    if (step === SheetStep.WITH_WHOM && stepPayloads[step] === 'ALONE') {
      setStep(prev => (prev + 2) as SheetStep);
    } else {
      setStep(prev => (prev + 1) as SheetStep);
    }
  };

  /**
   * 바텀시트가 닫힌 경우 모든 데이터를 초기화
   */
  const resetStep = () => {
    updateStepPayloads({});
    setStep(SheetStep.INFO);
  };

  return {
    step,
    stepPayloads,
    updateValue,
    backStep,
    nextStep,
    resetStep,
  };
};
