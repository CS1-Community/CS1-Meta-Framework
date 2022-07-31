import { RendererString } from "../types/RendererString";

export interface Renderer {
  type: RendererString;
  engine: any;
}