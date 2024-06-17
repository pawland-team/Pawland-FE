import { useMemo, useState } from 'react';

import { FunnelProps, NonEmptyArray, StepProps } from './type';
import { Funnel, Step } from './ui/funnel';

type RouteFunnelProps<Steps extends NonEmptyArray<string>> = Omit<FunnelProps<Steps>, 'steps' | 'step'>;

type FunnelComponent<Steps extends NonEmptyArray<string>> = ((props: RouteFunnelProps<Steps>) => JSX.Element) & {
  Step: (props: StepProps<Steps>) => JSX.Element;
};

/**
 * - 사용 예시 파일: pet-allowed-page.tsx
 * - 도움 받았던 블로그 주소: www.journee.life/devlog/react-useFunnel-hook
 */
export const useFunnel = <Steps extends NonEmptyArray<string>>(
  steps: Steps,
  options?: { initialStep?: Steps[number] },
): readonly [FunnelComponent<Steps>, activeStepIndex: number, (step: Steps[number]) => void] => {
  const [step, setStep] = useState(options?.initialStep ?? steps[0]);
  const activeStepIndex = steps.findIndex((s) => s === step);

  const FunnelComponent = useMemo(() => {
    return Object.assign(
      function RouteFunnel(props: RouteFunnelProps<Steps>) {
        return <Funnel<Steps> steps={steps} step={step} {...props} />;
      },
      {
        Step,
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return [FunnelComponent, activeStepIndex, setStep] as const;
};
