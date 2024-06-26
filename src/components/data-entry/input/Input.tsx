import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  useRef,
} from "react";
import classNames from "classnames";

import { IInputProps } from "./Input.types";
import { inputClasses as classes } from "./InputClasses";
import { composeRef } from "@modules";

export const Input = forwardRef<HTMLInputElement, IInputProps>((args, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { isError, onPressEnter, ...inputProps } = args;

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    args.onKeyDown?.(e);

    switch (e.key) {
      case "Enter":
        onPressEnter?.(inputRef.current?.value);

        if (onPressEnter) {
          e.preventDefault();
          e.stopPropagation();
        }
        break;
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    args.onChange?.(e);
  };

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    args.onBlur?.(e);
  };

  const inputClassName = classNames(args.className, classes.root, {
    invalid: isError,
  });

  return (
    <input
      {...inputProps}
      ref={composeRef(inputRef, ref)}
      className={inputClassName}
      onKeyDown={onPressEnter || args.onKeyDown ? handleKeyUp : undefined}
      onMouseDown={(e) => e.stopPropagation()}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      readOnly={args.readOnly}
      title={inputRef.current?.value}
      autoComplete="off"
    />
  );
});
