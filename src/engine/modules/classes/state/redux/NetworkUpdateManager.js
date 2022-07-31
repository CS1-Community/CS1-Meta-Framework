import { equals , deepCopy , getDecendantProp } from "../../../utils.js";

// Manages data requiring updating via the network.
let StateManager;
export function initNetworkUpdateManager(StateManager){
  StateManager = StateManager;
}


let updateDataForTransport = {};


export function getUpdateDataForTransport(){
  // Get a copy of current transport ready data
  const data = deepCopy(updateDataForTransport);
  // Clean the transport data heap in preparation
  // for the next transport cycle
  var props = Object.getOwnPropertyNames(updateDataForTransport);
  for (var i = 0; i < props.length; i++) {
    delete updateDataForTransport[props[i]];
  }
  return data;
}

/*
 We will only transport dirty values!
 Consider sending only the dirty values at each level!
*/
export function markForNetworkUpdate(slice){
  console.log(`Marking slice : ${slice} for network update.`);
}