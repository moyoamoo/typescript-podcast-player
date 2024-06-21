import { store } from "../redux/store";
import { setMessage } from "../redux/librarySlice";
import { loginUser } from "../apiRequests/Account/loginUser";


export const onFormSubmit = (e, errors, func, userInput) => {
  e.preventDefault();
  if (typeof errors === "undefined") {
    try {
      func(userInput);
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log(errors);
    store.dispatch(setMessage("Email and Password are Invalid! Try Again"));
  }
};

export const onLoginSubmit = (e, userInput, errors) => {
  const state = store.getState();
  const token = state.library.token;
  e.preventDefault();
  if (token) {
    store.dispatch(setMessage("Already logged in"));
  }
  if (typeof errors === "undefined") {
    loginUser(userInput);
  } else {
    store.dispatch(setMessage("Email and Password are Incorrect! Try Again"));
  }
};
