import { useState } from 'react';

export const useCheckIsTyping = () => {
  const [isTyping, setIsTyping] = useState(false);

  const startTyping = () => {
    setIsTyping(true);
  };

  const stopTyping = () => {
    setIsTyping(false);
  };

  return { isTyping, startTyping, stopTyping };
};
