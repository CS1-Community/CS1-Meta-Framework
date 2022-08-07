import { CS1 } from "./modules/interfaces/CS1";
import { CS1Slug } from "./modules/singletons/CS1Slug";

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
    CS1: any;
    StateManager: any;
    AFRAME: any;
    THREE: any;
    EngineStateStore: any;
  }
}

import { EngineStateStore } from "./modules/classes/state/mst/EngineStateStore";
import { renderer } from "./modules/renderer";
import { Config } from "./modules/singletons/Config";

(async () => {
  const CS1: CS1 = (window.CS1) = CS1Slug;
  EngineStateStore.setEngine(CS1);
  CS1.state = EngineStateStore;
  /* 
    The user may either first call await CS1.config(settings) followed by CS1.run(main), 
    or only call CS1.run(main) whereupon CS1.config({}) will be calleed internally
    prior to running the user's main application entry point.
    
    Note that at the CS1.config() function bootstraps the underlying ECS, renderer, ...
  */
  CS1.config = Config.config;
  Config.hydrate(CS1);
  CS1.run = async (main) => {
    if(!EngineStateStore.ready){
      console.log("Calling CS1.config with defaults ...");
      await CS1.config({});
    }
    const ready = CS1.state.ready;
    console.log(`engine.ready state in CS1.run is ${ready}!`);
    if (ready) {
      console.log("Calling app main() from CS1!");
      // Check if main is async, if not throw exception.
      main();
      delete CS1.config;
    } else {
      console.error("ERROR HYDRATING FRAMEWORK.");
    }
  };
})();
