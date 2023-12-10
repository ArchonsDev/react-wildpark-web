import { useState } from "react";

export const useToggle = (initial = false) => {
    const [value, setValue] = useState(initial);

    const toggle = () => {
        setValue(prev => !prev);
    }

    return [value, toggle];
}