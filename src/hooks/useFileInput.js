import { useState } from "react";

export const useFileInput = (initialValue, initialPhoto) => {
  const [value, setValue] = useState(initialValue);
  const [previewFile, setPreviewFile] = useState(initialPhoto);

  return {
    value,
    setValue,
    previewFile,
    setPreviewFile,
    reset: () => setValue(""),
    bind: {
      // value,
      onChange: event => {
        setValue(event.target.files[0]);
        const fr = new FileReader();
        fr.onload = function () {
          setPreviewFile(fr.result)
        }
        fr.readAsDataURL(event.target.files[0]);
      }
    }
  };
};

export default useFileInput