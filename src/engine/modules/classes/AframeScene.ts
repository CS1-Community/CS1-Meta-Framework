import { Scene } from "../interfaces/Scene";
import { Camera } from "../interfaces/Camera";
import { Entity } from "../interfaces/Entity";
import { EngineStateStore } from "./state/mst/EngineStateStore";

let temp = {
  cs1: {} as any,
  resolve: {} as any
}

export class AframeScene implements Scene {
  entity: any
  cameras : Camera[]
  activeCamera : Camera
  add: (arg: any)=>{}

  constructor(){
    this.add =  async (arg: any)=> {
      return new Promise((resolve, reject) => {
        console.log("INSIDE SCENE ADD PROMISE ...");
        console.log("this.entity");
        console.log(this.entity);
        console.log("this.entity.hasLoaded");
        console.log(this.entity.hasLoaded);
        console.log("arg");
        console.log(arg);
        console.log("typeof arg");
        console.log(typeof arg);
        switch (typeof arg) {
          case "string":
            const entity = document.createElement(arg);
            if (this.entity.hasLoaded) {
              this.entity.appendChild(entity);
              resolve(entity);
              return;
            } else {
              this.entity.addEventListener("loaded", () => {
                this.entity.hasLoaded = true;
                console.log("SCENE LOADED STRING ARG");
                this.entity.appendChild(entity);
                resolve(entity);
                return;
              });
            }
            break;
          default:
            const errorBox = document.createElement("a-box");
            errorBox.setAttribute("color", "red");
            errorBox.setAttribute("position", "0 0 -4");
            if (this.entity.hasLoaded) {
              this.entity.appendChild(errorBox);
              reject(errorBox);
              return;
            } else {
               this.entity.addEventListener("loaded", () => {
                this.entity.hasLoaded = true;
                this.entity.appendChild(entity);
                reject(errorBox);
                return;
              });
            }
        }
      });
    }
  }

  setup(cs1: any, resolve: any) {
    if (cs1.ecs?.scenes && cs1.ecs?.scenes[0]) {
      this.entity = cs1.ecs?.scenes[0];
      const cam = document.querySelector("[camera]");
      cam?.parentNode?.removeChild(cam);
    } else {
      this.entity = document.createElement("a-scene");
    }
    if (!window.CS1.ecs?.scenes || !window.CS1.ecs?.scenes[0]) document.body.appendChild(this.entity);
    temp.cs1 = cs1;
    temp.resolve = resolve;
    this.entity.addEventListener('loaded', this.addRig.bind(this));
  }
  
  addRig() {
    console.log("ADDING CS1.rig.entity to CS1.scene");
    console.log(temp.cs1.rig);
    this.entity.appendChild(temp.cs1.rig.entity);
    EngineStateStore.scene.setReady(temp.cs1, temp.resolve);
  }

}