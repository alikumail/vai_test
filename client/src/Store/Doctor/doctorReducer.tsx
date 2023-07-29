import { AnyAction } from 'redux';
import { doctorTypes } from "./doctorTypes";

type State = {
  errorMessage: string;
  type: string;
  [key: string]: string;
}



const INITIAL_STATE: State = {
  errorMessage: "",
  type: "",
};

const doctorReducer = (state: State | undefined, action: AnyAction) => {
  if (!state) state = INITIAL_STATE;
  switch (action.type) {
    case doctorTypes.USER_LOGIN_ONCHANGE:
      return {
        ...state,
        errorMessage: "",
        [action.payload.prop]: action.payload.value,
      };
    default:
      return state;
  }
};

export default doctorReducer;
