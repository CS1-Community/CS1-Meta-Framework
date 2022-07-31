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
  }
}

const CS1 = window.CS1;

export class NavmeshTest {
  constructor() {}
  async run() {
    // create blue box
    const box = await CS1.scene.add("a-box");
    console.log("box");
    console.log(box);
    box?.setAttribute("color", "yellow");
    box?.object3D.position.set(0, 1, -5);
    
    const map = document.createElement("a-gltf-model");
    map.setAttribute("src","https://cdn.glitch.global/656c1d0b-a220-4a8c-8ecb-d01466ec202b/level_design_practice_1_complete.glb?v=1649347395645");
    map.setAttribute("id","map");
    
    const navmesh = document.createElement("a-gltf-model");
    navmesh.setAttribute("src", "https://cdn.glitch.global/656c1d0b-a220-4a8c-8ecb-d01466ec202b/navmesh%20(15).gltf?v=1649347490062");
    navmesh.id = "navmesh";
    navmesh.setAttribute("visible", false);
    
    CS1.scene.entity.appendChild(map);
    CS1.scene.entity.appendChild(navmesh);

    //add a-cursor as child of camera
    //const cursor = document.createElement("a-cursor");
    //CS1.cam.entity.appendChild(cursor);
    
    //add navmesh constraint to camera
    CS1.cam.entity.setAttribute("simple-navmesh-constraint", "navmesh:#navmesh;fall:0.5;height:1.65;");
    box.addEventListener("click", (e) => {
      console.log("The box was clicked!");
    });

    
  }
}
