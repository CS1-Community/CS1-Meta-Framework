import { ECS } from "./ECS";
import { Camera } from "./Camera";
import { Scene } from "./Scene";
import { Renderer } from "./Renderer";
import { Run } from "../types/Run";

export interface CS1 {
  cam: any;
  rig: any;
  scene: any;
  renderer: any;
  ecs: any;
  utils: any;
  run: any;
  config: any;
  state: any;
  app: any;
}

// export interface CS1 {
//   cam: Camera;
//   rig: any;
//   scene: Scene;
//   renderer: Renderer;
//   ecs: ECS;
//   utils: any;
//   run: Run;
//   config: any;
//   runAppEntryPoint: any;
//   state: any;
//   app: any;
// }