import { Camera } from "../interfaces/Camera";
import { CameraString } from "../types/CameraString";
import { Entity } from "../interfaces/Entity";

export class AframeCam implements Camera {
  entity : Entity
  type: CameraString
  lookAt : (entity : Entity) => {}
  setActive : () => {}
  
  constructor(){
    
  }
  
  setUp(cs1:any, resolve:any):void {
    console.log("Setting up cam.");
    this.entity = document.createElement("a-entity");
    this.entity.name = "CS1 Cam Entity";
    this.entity.setAttribute("camera", "active:true");
    this.entity.setAttribute("position", "0 1.65 0");
    this.entity.setAttribute("look-controls", "pointerLockEnabled: true");
    EngineStateStore.cam.setReady(cs1, resolve);
  }
}