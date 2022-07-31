import { Scene } from "../interfaces/Scene";
import { Camera } from "../interfaces/Camera";
import { Entity } from "../interfaces/Entity";

export class AframeScene implements Scene {
  cameras : Camera[]
  activeCamera : Camera
  
  constructor(){
    
  }
}