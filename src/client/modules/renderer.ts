import { loadScript } from "./utils/utils.js";
import { registry } from "./registry.js";
import { CS1 } from "./classes/state/mst/EngineStateStore";


/* 
This will eventually allow an isomorphic set of functions which
can be run across several supported renderers including Three.js 
and Babylon.js.
*/
export const renderer = {
  init : async function () {
    console.log("Time to init the renderer!");
    await loadScript(registry.cdn.AFRAME);
    console.log("AFRAME :");
    console.log(window.AFRAME);
    console.log("The renderer is ready!!");
    renderer.type = "AFRAME";
    // THESE SHOULD NOT BE HERE!!!
    await loadScript(registry.cdn.simpleNavmeshConstraint);
    await loadScript(registry.cdn.rigWASDControls);
    //MST ACTION CALL
    CS1.state.renderer.setReady();
    deleteInit();
  },
  type : ""
}

function deleteInit(){
  delete renderer.init;
}