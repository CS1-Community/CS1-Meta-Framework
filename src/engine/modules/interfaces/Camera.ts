import { Entity } from "./Entity";
import { CameraString } from "../types/CameraString";

export interface Camera {
  entity: Entity;
  type: CameraString;
  setup: (cs1:any, resolve:any)=>void,
  lookAt: (entity: Entity)=>{};
  setActive: ()=>{};
}