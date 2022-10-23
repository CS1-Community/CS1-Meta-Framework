import  { Scene } from "../../interfaces/Scene";
import { Camera } from "../../interfaces/Camera";
import { Entity } from "../../interfaces/Entity";

export class BabylonScene implements Scene {
  cameras : Camera[]
  activeCamera : Camera
  add: (arg: any)=>{}
  
  constructor(){
    this.add =  async (arg: any)=> {}
  }
}