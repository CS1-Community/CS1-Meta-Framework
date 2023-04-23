import { Entity } from "../../../../interfaces/Entity";
import {
    Entity as aframeEntity
  } from "aframe";
import { uuid } from "../../../../utils/utils";
export interface patchedEntity extends aframeEntity, Entity{
    patched: true
}
export function EntityPatch (ent: any): Entity {
    ent.uid = uuid();
    ent.setData = (data: any) => {
        console.log("LOL... not yet implemented!");
    };
    return ent as patchedEntity;
}