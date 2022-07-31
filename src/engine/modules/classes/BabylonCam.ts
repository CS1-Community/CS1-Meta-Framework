import { Camera } from "../interfaces/Camera";
import {CameraString } from "../types/CameraString";
import { Entity } from "../interfaces/Entity";

export class BabylonCam implements Camera {
  entity: Entity
  type: CameraString
  lookAt: (entity: Entity)=>{}
  setActive: ()=>{}
  
  constructor(){
    
  }
  
  
}