import { Scene } from "./Scene";
import { ComponentMap } from "./ComponentMap";
import { ECSString } from "../types/ECSString";

export interface ECS {
  type: ECSString;
  scenes : Scene[];
  components : ComponentMap;
}