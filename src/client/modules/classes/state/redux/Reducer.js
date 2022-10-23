import { deepCopy, setDecendantProp } from "../../../utils.js";
/*
The intention of the reactions is to provide a dynamic middleware as opposed to the default redux middleware dispatch wrapper.

The engine will create reactions for the user based upon the globally tracked and shared state.
*/
export class Reducer {
  constructor(StateManager) {
    this.reactions = [
      { type: "username", mutation: this.addReplace },
      { type: "level", mutation: this.addReplace },
      { type: "appId", mutation: this.addReplace },
      { type: "newProp", mutation: this.add },
      { type: "replacementProp", mutation: this.replace },
      { type: "house", mutation: this.addReplace },
      { type: "path-mutation", mutation: this.pathMutation },
      {
        type: "upstream-node-notification",
        mutation: this.upstreamNodeDispatchHandler,
      },
    ];
    this.createReducer();
  }

  pathMutation(state, action) {
    let result = state;
    const path = action.payload.path;
    const value = action.payload.value;
    setDecendantProp(result, path, value);
    console.log("Reaction returning : ", result);
    return result;
  }

  add(state, action) {
    let result = state;
    if (result[action.type]) {
      console.log(
        "Add mutation called for state property that already exists!"
      );
      return result;
    } else {
      result[action.type] = action.payload[action.type];
      console.log("Reaction returning : ", result);
      return result;
    }
  }

  replace(state, action) {
    let result = state;
    if (result[action.type]) {
      result[action.type] = action.payload[action.type];
      console.log("Returning : ", result);
      return result;
    } else {
      console.log(
        "Replace mutation called for state property that does not exist!"
      );
      return result;
    }
  }

  addReplace(state, action) {
    let result = state;
    const type = action.type;
    if (type && action.payload && action.payload[type]) {
      result[type] = action.payload[type];
    }
    return result;
  }

  createReducer() {
    this.reducer = (state, action) => {
      console.log(`Searching the reactions for action.type : ${action.type}`);
      console.log("reactions: ", this.reactions);
      const reaction = this.reactions.filter((r) => r.type === action.type)[0];
      if (reaction) {
        console.log("Reaction found!");
        console.log(reaction);
        console.log(`The action.payload.path is ${action.payload.path}.`);
        return reaction.mutation(state, action);
      } else {
        return this.addReplace(state, action);
      }
    };
  }
}
