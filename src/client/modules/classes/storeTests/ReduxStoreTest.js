import { createStore, combineReducers } from "redux";

import { user } from "./reducers/userReducer";
import { items } from "./reducers/itemsReducer";
import { environment } from "./reducers/environmentReducer";

const reducers = combineReducers({
  user: user,
  items: items,
  environment: environment 
});

const store = createStore(
  reducers,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export class StoreTest {
  constructor() {
    console.log("Just made a Redux store test.");
    // Simulate change of user name
    store.dispatch({ type: "username", payload: { name: "Hero" } });
    // Simulate change of sword level
    store.dispatch({
      type: "swords",
      payload: { short: { level: 1 }, broad: {} }
    });
    store.dispatch({
      type: "shopAccess",
      payload: { houses: {}, ground: {}, shop: { access: false }, trees: {} }
    });
  }
}

store.subscribe(() => {
  console.log(
    "Subscription handler running.  This is what informs the next view to be rendered."
  );
  console.log("New state:");
  console.log(store.getState());
});

// const initialState = {
//   type:'test',
//   value: 0
// }

// const reducer = (state = initialState, action) => {
//   console.log('reducer called');
//   console.log('state:');
//   console.log(state);
//   return state;
// };

// const store = createStore(
//   reducer,
//   {},
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// export class StoreTest {
//   constructor() {
//     console.log("Just made a Redux store test.");
//     store.dispatch({type:'test',payload:{value:999}});
//   }
// }
