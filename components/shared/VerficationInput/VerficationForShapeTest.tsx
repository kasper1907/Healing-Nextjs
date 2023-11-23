import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";

const InputForShapeTest = ({
  code,
  setCode,
  formData,
  setShowNext,
  type,
}: any) => {
  const inputRefs = Array.from({ length: 7 }, () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRef<HTMLInputElement>(null)
  );

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;

    // Prevent entering values if the previous input is empty
    if (index > 0 && !code[index - 1]) {
      return;
    }
    setCode({ ...formData, shapeTest: newCode });

    if (index == 6) {
      setShowNext(true);
    } else {
      setShowNext(false);
    }

    // Move to the next input
    if (index < 6 && value !== "") {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to the previous input on backspace if the current input is empty
    if (event.key === "Backspace" && index > 0 && code[index] === "") {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  return (
    <div>
      {code?.map((value: any, index: any) => (
        <input
          style={{
            width: "50px",
            height: "45px",
            border: "1px solid #c6c6c6",
            borderRadius: "8px",
          }}
          className="verification-input"
          key={index}
          type="text"
          maxLength={1}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(index, e.target.value)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(index, e)
          }
          ref={inputRefs[index]}
        />
      ))}
    </div>
  );
};

export default InputForShapeTest;
