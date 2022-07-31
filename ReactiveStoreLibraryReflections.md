# Reactive Store Library Reflections
___

### [Dan Wahlin's Observable-Store](https://github.com/DanWahlin/Observable-Store)

- Doesn't look there is a clear way to define reducers.
- Need to practice subscribing to changes.
- Doesn't look like we can subscribe to an individual leaf at the end of an object tree path.

### [Zustand](https://github.com/pmndrs/zustand)

- Limited subscription depth to two nodes deep.
- Issues with react calling process.env in client.


**Compare build size of engine with observable-store vs. zustand.**
![Compare build size of engine with observable-store vs. zustand.](https://cdn.glitch.me/1c5e6ce8-b924-4a4b-8767-32acb5950a1e%2FScreen%20Shot%202021-11-14%20at%2011.11.46%20AM.png?v=1636906328935)

### Redux

- [AFRAME Specific Docs](https://aframe.io/blog/gamestate/)
- [Redux Docs](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers)
  - [Middleware](https://redux.js.org/understanding/history-and-design/middleware)
- [Combine Reducers](https://youtu.be/7q60_OwFY64)

**We will use a single global store with multiple reducers combined with combineReducers.**

Mutliple stores may be: environment, items, avatar, and user each with a single top-level reducer switching on action type applying the appropriate reducer(s).

The flow **MUST ALWAYS** follow this sequence:
**action** -> **store** -> **view**

**action** : Actions are dispatched at events.  These actions are objects, normally containing a "type" and some accompanying data "payload" perhaps determined at runtime based upon some branching logic.

**store** : The store is an instance of Redux providing helper functions such as "dispatch", "getState", ...

**view** : The view , in our case, can include AFRAME entities, components, and other encapsulating logic structures.


```
import { createStore } from 'redux';

const reducer = (state = {}, action) => {
  console.log('reducer called');
  console.log('state:');
  console.log(state);
  return state;
};

const store = createStore(
  reducer, 
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export class StoreTest {
  constructor() {
    console.log("Just made a Redux store test.");
    store.dispatch({type:'test',payload:{value:999}});
  }
}
```

Install the [Redux devtools Chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/).

![Redux devtools](https://cdn.glitch.me/1c5e6ce8-b924-4a4b-8767-32acb5950a1e%2FRedux_devtools.png?v=1637528686620)


### MobX

- [Docs](https://mobx.js.org/README.html)

