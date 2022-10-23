import { Camera } from "./Camera";

export interface Scene {
  cameras : Camera[];
  activeCamera : Camera;
  add: (arg: any)=>{};
}