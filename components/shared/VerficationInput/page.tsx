import React, {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
} from "react";
import { toast } from "sonner";

const VerificationCodeInput = ({
  code,
  setCode,
  formData,
  setShowNext,
  type,
}: any) => {
  const allowedNumbers = ["0", "1", "2", "3", "4"];

  const inputRefs = Array.from({ length: 5 }, () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRef<HTMLInputElement>(null)
  );

  const handleChange = (index: number, value: string) => {
    if (!allowedNumbers.includes(value)) {
      return toast.info("Please enter a number between 0 and 4");
    }

    if (code.includes(value)) {
      return toast.warning("You can't enter the same number twice");
    }

    const newCode = [...code];
    newCode[index] = value;

    // Prevent entering values if the previous input is empty
    if (index > 0 && !code[index - 1]) {
      return;
    }

    if (type === "colorTest") {
      setCode({ ...formData, colorTest: newCode });
    } else {
      setCode({ ...formData, shapeTest: newCode });
    }

    if (index === 4) {
      setShowNext(true);
    } else {
      setShowNext(false);
    }

    // Enable the next input
    if (index < 4 && value !== "") {
      inputRefs[index + 1]?.current?.removeAttribute("disabled");
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to the previous input on backspace
    if (event.key === "Backspace") {
      //@ts-ignore
      if (event.target.value == "") {
        // Focus on the previous input
        inputRefs[index - 1]?.current?.focus();

        // Enable the previous input
        // inputRefs[index - 1]?.current?.removeAttribute("disabled");
        if (index > 0) {
          inputRefs[index]?.current?.setAttribute("disabled", "true");
        }
      } else {
        if (index >= 0) {
          // Remove the value
          const newCode = [...code];
          newCode[index] = "";
          // Update the state
          setCode(
            type === "colorTest"
              ? { ...formData, colorTest: newCode }
              : { ...formData, shapeTest: newCode }
          );

          // Focus on the previous input
          inputRefs[index]?.current?.focus();

          // Disable the current input
          // inputRefs[index]?.current?.setAttribute("disabled", "true");
        }
      }

      //@ts-ignore
      if (index == 4 && event.target.value != "") {
        setShowNext(true);
      } else {
        setShowNext(false);
      }
    }
  };

  useEffect(() => {
    if (code?.length > 0) {
      code?.forEach((value: any, index: any) => {
        if (value) {
          inputRefs[index]?.current?.removeAttribute("disabled");
        }
      });

      console.log(code);
      // check if all inputs are filled and the length of code is 5
      if (code?.length === 5 && code?.every((value: any) => value)) {
        setShowNext(true);
      } else {
        setShowNext(false);
      }
    }
  }, [code, inputRefs, setShowNext]);

  return (
    <div>
      {code?.map((value: any, index: any) => (
        <input
          key={index}
          type="tel"
          maxLength={1}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value?.length > 0) {
              handleChange(index, e.target.value);
            }
          }}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(index, e)
          }
          ref={inputRefs[index]}
          className="verification-input"
          disabled={index !== 0 && !code[index - 1]}
          style={{
            width: "50px",
            height: "45px",
            border: "1px solid #c6c6c6",
            borderRadius: "8px",
            color: "#000 !important",
          }}
        />
      ))}
    </div>
  );
};

export default VerificationCodeInput;
