import { useState } from 'react';

const useFunnel = () => {
  const [step, setStep] = useState();

  const Step = (props) => {
    return <>{props.children}</>;
  };

  const Funnel = ({ children }) => {
    // name이 현재 step 상태와 동일할 경우 렌더링
    const targetStep = children.find((childStep) => childStep.props.name === step);

    return Object.assign(targetStep, { Step });
  };

  return [Funnel, setStep];
};

export { useFunnel };
