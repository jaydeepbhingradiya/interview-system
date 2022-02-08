import { createStore } from "redux";
import candidateResultReducer from "./reducer";

const store = createStore(
  candidateResultReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
