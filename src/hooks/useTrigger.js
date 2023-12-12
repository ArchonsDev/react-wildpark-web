import { useState } from "react";

export const useTrigger = (initial = false) => {
    const [state, setState] = useState(initial);

    const trigger = (duration = 3000) => {
        setState(true);
        setTimeout(() => {
            setState(false);
        }, duration);
    };

    return [state, trigger];
}