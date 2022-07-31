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

export const StateTest = (async () => {
  // create blue box
  global.box = await global.CS1.scene.add("a-box");
  console.log("global.box");
  console.log(global.box);
  global.box?.setAttribute("color", "yellow");
  global.box?.object3D.position.set(0, 1, -5);

  //add a-cursor as child of camera
  const cursor = document.createElement("a-cursor");
  global.CS1.cam.entity.appendChild(cursor);
  global.box.addEventListener("click", (e) => {
    global.StateManager.dispatch({
      type: "path-mutation",
      payload: {
        path: "house.rooms.bathroom.locked",
        value: global.box.getAttribute("color") === "green" ? false : true,
      },
    });
  });

  global.StateManager.subscribe("house.rooms.bathroom.locked", () => {
    global.box.setAttribute(
      "color",
      global.box.getAttribute("color") === "green" ? "red" : "green"
    );
  });
})();
