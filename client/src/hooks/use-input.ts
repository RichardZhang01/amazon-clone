import { Action } from "../shared/models/action.interface";
import { InputState } from "./models/inputState.interface";
import {
  InputActionType,
  INPUT_ACTION_CHANGE,
  INPUT_ACTION_BLUR,
  INPUT_ACTION_CLEAR,
} from "./models/inputAction";
import { ChangeEvent, useReducer } from "react";
import { ValidatorFn } from "../shared/utils/validation/models/ValidatorFn";

const initialInputState: InputState = {
  text: "",
  hasBeenTouched: false,
};

const inputReducer = (state: InputState, action: Action<InputActionType>) => {
  const { type, payload = "" } = action;

  switch (type) {
    case INPUT_ACTION_CHANGE:
      return { text: payload, hasBeenTouched: state.hasBeenTouched };
    case INPUT_ACTION_BLUR:
      return { text: state.text, hasBeenTouched: true };
    case INPUT_ACTION_CLEAR:
      return { text: "", hasBeenTouched: false };

    default:
      return { ...state };
  }
};

const useInput = (validatorFn?: ValidatorFn) => {
  const [{ text, hasBeenTouched }, dispatch] = useReducer(
    inputReducer,
    initialInputState
  );

  let shouldDisplayError;

  if (validatorFn) {
    const isValid = validatorFn(text);
    shouldDisplayError = !isValid && hasBeenTouched;
  }

  const textChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: INPUT_ACTION_CHANGE, payload: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: INPUT_ACTION_BLUR });
  };

  const clearHandler = () => {
    dispatch({ type: INPUT_ACTION_CLEAR });
  };

  return {
    text,
    shouldDisplayError,
    textChangeHandler,
    inputBlurHandler,
    clearHandler,
  };
};

export default useInput;
