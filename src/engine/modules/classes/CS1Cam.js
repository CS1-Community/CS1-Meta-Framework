import { StateManager } from "./state/redux/StateManager.js";
import { EngineStateStore } from "./state/mst/EngineStateStore";

export class CS1Cam {
  constructor() {
    
  }

  
  setup(cs1, resolve) {
    console.log("Setting up cam.");
    this.entity = document.createElement("a-entity");
    this.entity.name = "CS1 Cam Entity";
    this.entity.setAttribute("camera", "active:true");
    this.entity.setAttribute("position", "0 1.65 0");
    this.entity.setAttribute("look-controls", "pointerLockEnabled: true");
    EngineStateStore.cam.setReady(cs1, resolve);
    
  }
  
  lookAt(pos) {
    
  }

}
