import { loadScript as loadScriptImport} from "./helpers/loadScript";
import { resolveWhenTrue } from "./helpers/resolveWhenTrue";
import { uuid as uuidImport} from "./helpers/uuid";
import { equals as equalsImport} from "./helpers/equals";
import { deepCopy as deepCopyImport} from "./helpers/deepCopy";
import { getDecendantProp as getDecendantPropImport} from "./helpers/getDecendantProp";
import { setDecendantProp as setDescendantPropImport} from "./helpers/setDecendantProp";
import { isDotDotDotToken } from "typescript";

export const utils = {
  loadScript: loadScriptImport,

  resolveWhenTrue: resolveWhenTrue,

  uuid: uuidImport,

  equals: equalsImport,

  deepCopy: deepCopyImport,

  setDecendantProp: setDescendantPropImport,
  
  getDecendantProp: getDecendantPropImport,
};

export const uuid = utils.uuid;
export const loadScript = utils.loadScript;
export const equals = utils.equals;
export const deepCopy = utils.deepCopy;
export const getDecendantProp = utils.getDecendantProp;
export const setDecendantProp = utils.setDecendantProp;
