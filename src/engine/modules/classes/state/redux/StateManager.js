// Currently exposing dispatch. Eventually dispatch will be conducted under the hood.
export const StateManager = {
  getState: null,

  dispatch: null,

  subscribe: addSubscription,

  unsubscribe: removeSubscription,

};

import { GlobalStore } from "./GlobalStore.js";
const store = new GlobalStore(StateManager);
import { uuid, equals, deepCopy, getDecendantProp } from "../../../utils.js";
StateManager.getState = () => {
  return store.store.getState();
};
import { InitialState } from "./InitialState.js";
StateManager.lastState = deepCopy(InitialState);
import { DispatchManager } from "./DispatchManager.js";
DispatchManager.setStore(store);
/*
 The decision to include the last state in dispatch is a current consideration
 but can very likely be revoked. In fact the need for the DispatchManager is
 under reconsideration.
*/
StateManager.dispatch = (action) => {
  DispatchManager.dispatch(action, StateManager.lastState);
};
import {
  initNetworkUpdateManager,
  markForNetworkUpdate,
} from "./NetworkUpdateManager.js";
initNetworkUpdateManager(StateManager);
let subscriptions = [];

function addSubscription(slice, handler) {
  const id = uuid();
  subscriptions.push({ id: id, slice: slice, handler: handler });
  return id;
}

function removeSubscription(id) {
  subscriptions = subscriptions.filter((s) => s.id !== id);
}

function globalHandler() {
  console.log("Running global handler!");
  const lastState = StateManager.lastState;
  const currentState = StateManager.getState();
  console.log("Last State :");
  console.log(lastState);
  console.log("Current State :");
  console.log(currentState);
  subscriptions.forEach(function (subscription) {
    let currentValue = getDecendantProp(currentState, subscription.slice);
    let lastValue = getDecendantProp(lastState, subscription.slice);

    console.log("last prop value: ", lastValue);
    console.log("current prop value: ", currentValue);
    if (!equals(lastValue, currentValue)) {
      /*
       Currently marking everything for network update.
       I will eventually add a filter here.
      */
      console.log("Alerting Network Update Manager!");
      markForNetworkUpdate(subscription.slice);
      /*
       I need to know if the current subscription.slice
       is the same slice mutation that caused this call.
       By passing the slice mutation to the superpath
       subscription handler, the handler doesn't have to 
       find out what specific thing(s) changed.
      */
      console.log("Calling subscription handler.");
      subscription.handler();
      StateManager.lastState = deepCopy(currentState);
    }
  });
}

store.store.subscribe(globalHandler);
