import { Rig } from "../interfaces/Rig";
import { RigString } from "../types/RigString";
import { Entity } from "../interfaces/Entity";
import { EngineStateStore } from "./state/mst/EngineStateStore";

export class AframeRig implements Rig {
  entity: any
  type: RigString
  
  constructor(type: RigString){
    this.type = type;
  }

  setup(cs1: any, resolve: any) {
    console.log("Setting up rig.");
    this.entity = document.createElement("a-entity");
    this.entity.name = "CS1 Rig Entity";
    console.log("SETTING UP RIG WITH CS1.cam.entity");
    console.log(cs1.cam.entity);
    this.entity.appendChild(cs1.cam.entity);
    this.entity.setAttribute("rig-wasd-controls", "");
    EngineStateStore.rig.setReady(cs1, resolve);
  }
}