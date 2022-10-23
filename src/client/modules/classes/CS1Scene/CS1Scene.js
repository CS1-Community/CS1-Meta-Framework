import { StateManager } from "../state/redux/StateManager.js";
import { EngineStateStore } from "../state/mst/EngineStateStore";
//import { player } from "./components/player";
//import { follow } from "./components/follow";
export class CS1Scene {
  constructor() {

  }

  setup(cs1, resolve) {
    if (window.CS1.ecs?.scenes && window.CS1.ecs?.scenes[0]) {
      this.entity = window.CS1.ecs?.scenes[0];
      const cam = document.querySelector("[camera]");
      cam.parentNode.removeChild(cam);
    } else {
      this.entity = document.createElement("a-scene");
    }
    if (!window.CS1.ecs?.scenes || !window.CS1.ecs?.scenes[0]) document.body.appendChild(this.entity);
    this.cs1 = cs1;
    this.resolve = resolve;
    this.entity.addEventListener('loaded', this.addRig.bind(this));
  }
  
  addRig() {
    console.log("ADDING CS1.rig.entity to CS1.scene");
    console.log(CS1.rig);
    this.entity.appendChild(CS1.rig.entity);
    EngineStateStore.scene.setReady(this.cs1, this.resolve);
  }

  async add(arg) {
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
