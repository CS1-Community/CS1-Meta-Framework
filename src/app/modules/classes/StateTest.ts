import {
  Component,
  Entity,
  MultiPropertySchema,
  System,
  SystemDefinition,
  THREE,
  Geometry,
  registerComponent,
  Scene,
} from "aframe";

declare global {
  interface Window {
    box: any;
    CS1: any;
    StateManager: any;
  }
}

const CS1 = window.CS1;
const StateManager = window.StateManager;

export class StateTest {
  constructor() {}
  async run() {
    // create blue box
    const box = await CS1.scene.add("a-box");
    console.log("box");
    console.log(box);
    box?.setAttribute("color", "yellow");
    box?.object3D.position.set(0, 1, -5);

    //add a-cursor as child of camera
    const cursor = document.createElement("a-cursor");
    CS1.cam.entity.appendChild(cursor);
    box.addEventListener("click", (e) => {
      StateManager.dispatch({
        type: "path-mutation",
        payload: {
          path: "house.rooms.bathroom.locked",
          value: box.getAttribute("color") === "green" ? false : true,
        },
      });
    });

    StateManager.subscribe("house.rooms.bathroom.locked", () => {
      box.setAttribute(
        "color",
        box.getAttribute("color") === "green" ? "red" : "green"
      );
    });
  }
}
