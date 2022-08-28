import { Camera } from "../interfaces/Camera";
import { CameraString } from "../types/CameraString";
import { Entity } from "../interfaces/Entity";

export class ThreeCam implements Camera {
  entity: Entity
  type: CameraString
  lookAt: (entity: Entity)=>{}
  setActive: ()=>{}
  setup: (cs1:any, resolve:any)=>void
  
  constructor(){
    
  }
}