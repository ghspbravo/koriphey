import { useState } from "react";

export const useInput = (initialValue = '', type = 'string') => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        switch (type) {
          case 'number':
            setValue(parseInt(event.target.value))
            break


          default:
            setValue(event.target.value)
        }
      }
    }
  };
};

export default useInput