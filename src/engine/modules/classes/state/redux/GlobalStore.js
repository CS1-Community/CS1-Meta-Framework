import { createStore, combineReducers } from "redux";
import { Reducer } from "./Reducer.js";
import { InitialState } from "./InitialState.js";

export class GlobalStore {
  constructor(StateManager) {
    this.reducer = new Reducer(StateManager);
    this.store = createStore(
      this.reducer.reducer,
      InitialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }
}