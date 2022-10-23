import { Settings } from "../types/Settings";
import { CS1 } from "../interfaces/CS1";
import { CS1Scene } from "../classes/CS1Scene/CS1Scene.js";
import { CS1Cam } from "../classes/CS1Cam/CS1Cam.js";
import { CS1Rig } from "../classes/CS1Rig/CS1Rig.js";
import { AframeCam } from "../classes/AframeCam/AframeCam";
import { AframeRig } from "../classes/AframeRig/AframeRig";
import { AframeScene } from "../classes/AframeScene/AframeScene";
import { loadScript } from "../utils/utils.js";
import { registry } from "../registry.js";

declare global {
  interface Window {
    CS1: any;
    StateManager: any;
    AFRAME: any;
    THREE: any;
    EngineStateStore: any;
  }
}
/*
Note: the methods within this object perform mutations on the global
CS1 object which is dependency injected in hydrate.
*/
export const Config = {
  hydrate: function(cs1:CS1) {
    Config.CS1 = cs1;
  },
  config: function(settings:Settings){
    return new Promise(async (resolve , reject) => {
      // switch on settings
    // spread settings over defaults
    settings = {
      ...Config.defaults,
      ...settings
    }
    console.log("Running config with settings : ", settings);
    let renderer, ecs;
    switch (settings.ecs){
      case "CS1":
        break;
      default:
        //AFRAME
        console.log("LOADING AFRAME ...");
        await loadScript(registry.cdn.AFRAME_LATEST);
        await loadScript(registry.cdn.rigWASDControls);
        await loadScript(registry.cdn.simpleNavmeshConstraint);
        ecs = window.AFRAME;
        console.log("ecs : ", ecs);
        //delete(window.AFRAME);
        renderer = window.THREE;
        //delete(window.THREE);
        console.log("Instantiating CS1 Cam, Rig, and Scene");
        // Replace with instantiations of:
        // AframeCam, AframeRig, and AframeScene
        Config.CS1.cam = new AframeCam('player-cam');
        Config.CS1.rig = new AframeRig('player-rig');
        Config.CS1.scene = new AframeScene();
  
    }
    Config.CS1.ecs = ecs;
    Config.CS1.renderer = renderer;
    /*
     NEXT STEPS:
       Set the cam, rig, and scene
       based upon the configuration.
    */ 
    if(Config.CS1.ecs && Config.CS1.renderer){
      Config.CS1.state.renderer.setReady(Config.CS1, resolve);
    }else{
      console.error("REJECTING CONFIG PROMISE!!!")
      reject(Config.CS1);
    }
    });
  },
  defaults: {
    renderer: "THREE",
    ecs: "AFRAME"
  },
  CS1: {} as CS1
}