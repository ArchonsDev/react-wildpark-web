import { useState } from "react";

export const useSwitch = () => {
  const [state, setState] = useState(false);

  const open = () => {
    setState(true);
  }

  const close = () => {
    setState(false);
  }

  return [state, open, close];
}