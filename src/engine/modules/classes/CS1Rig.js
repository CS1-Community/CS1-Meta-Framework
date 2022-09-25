import { StateManager } from "./state/redux/StateManager.js";
import { EngineStateStore } from "./state/mst/EngineStateStore";

export class CS1Rig {
  constructor() {
    
  }

  
  setup(cs1, resolve) {
    console.log("Setting up rig.");
    this.entity = document.createElement("a-entity");
    this.entity.name = "CS1 Rig Entity";
    console.log("SETTING UP RIG WITH CS1.cam.entity");
    console.log(CS1.cam.entity);
    this.entity.appendChild(CS1.cam.entity);
    this.entity.setAttribute("rig-wasd-controls", "");
    EngineStateStore.rig.setReady(cs1, resolve);
  }
}