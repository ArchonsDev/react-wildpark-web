import { useState } from "react";

export const useTrigger = (initial = false, callback) => {
  const [state, setState] = useState(initial);

  const trigger = (duration = 3000) => {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, duration);
    callback && callback();
  };

  return [state, trigger];
};
