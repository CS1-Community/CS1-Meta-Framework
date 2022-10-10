import { loadScript } from "./helpers/loadScript";
import { resolveWhenTrue } from "./helpers/resolveWhenTrue";
import { uuid } from "./helpers/uuid";
import { equals } from "./helpers/equals";
import { deepCopy } from "./helpers/deepCopy";
import { getDecendantProp } from "./helpers/getDecendantProp";
import { setDecendantProp } from "./helpers/setDecendantProp";

export const utils = {
  loadScript: loadScript,

  resolveWhenTrue: resolveWhenTrue,

  uuid: uuid,

  equals: equals,

  deepCopy: deepCopy,

  getDecendantProp: getDecendantProp,

  setDecendantProp: setDecendantProp,
};

export const uuid = utils.uuid;
export const loadScript = utils.loadScript;
export const equals = utils.equals;
export const deepCopy = utils.deepCopy;
export const getDecendantProp = utils.getDecendantProp;
export const setDecendantProp = utils.setDecendantProp;
