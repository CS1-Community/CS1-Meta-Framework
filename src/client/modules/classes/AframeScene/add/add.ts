import { AframeScene } from "../AframeScene";
import { handleObjectArg } from "./argTypes/object/handleObjectArg";

export const add = async (arg: any, scene : AframeScene, resolve, reject) => {
    console.log("INSIDE SCENE ADD PROMISE ...");
    console.log("scene.entity");
    console.log(scene.entity);
    console.log("scene.entity.hasLoaded");
    console.log(scene.entity.hasLoaded);
    console.log("arg");
    console.log(arg);
    console.log("typeof arg");
    console.log(typeof arg);
    switch (typeof arg) {
      case "string":
        if(arg.includes(".glb") || arg.includes(".gltf")){
          const ent = document.createElement("a-gltf-model");
          ent.setAttribute("src", arg);
          if (scene.entity.hasLoaded) {
            scene.entity.appendChild(ent);
            resolve(ent);
            return;
          } else {
            scene.entity.addEventListener("loaded", () => {
              scene.entity.hasLoaded = true;
              console.log(`SCENE LOADED GLTF WITH URL ${arg}`);
              scene.entity.appendChild(ent);
              resolve(ent);
              return;
            });
          }
        } else {
          const ent = document.createElement(arg);
          if (scene.entity.hasLoaded) {
            scene.entity.appendChild(ent);
            resolve(ent);
            return;
          } else {
            scene.entity.addEventListener("loaded", () => {
              scene.entity.hasLoaded = true;
              console.log("SCENE LOADED STRING ARG");
              scene.entity.appendChild(ent);
              resolve(ent);
              return;
            });
          }
        }
        break;
      case "object":
        handleObjectArg(arg, resolve, reject);
        break;
      default:
        const errorBox = document.createElement("a-box");
        errorBox.setAttribute("color", "red");
        errorBox.setAttribute("position", "0 0 -4");
        if (scene.entity.hasLoaded) {
          scene.entity.appendChild(errorBox);
          reject(errorBox);
          return;
        } else {
           scene.entity.addEventListener("loaded", () => {
            scene.entity.hasLoaded = true;
            scene.entity.appendChild(errorBox);
            reject(errorBox);
            return;
          });
        }
    }
}
