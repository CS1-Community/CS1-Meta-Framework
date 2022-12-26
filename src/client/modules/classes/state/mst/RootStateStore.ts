export let CS1;

import {
  types,
  onSnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  getParent,
} from "mobx-state-tree";

import { ApplicationStateModel } from "./ApplicationStateStore";
import { EngineStateModel } from "./EngineStateStore";

const RootStateModel = types
  .model("RootStateModel", {
    application: ApplicationStateModel,
    engine: EngineStateModel,
    ready: false
  })
  .actions((root) => ({
    setReady(cs1, resolve): void {
      root.ready = true;
      console.log("Root data store is READY!");
      resolve(cs1);
    }
  }));

interface IRootStateModel extends Instance<typeof RootStateModel> {}
interface IRootStateModelSnapshotIn
  extends SnapshotIn<typeof RootStateModel> {}
interface IRootStateModelSnapshotOut
  extends SnapshotOut<typeof RootStateModel> {}

export const RootStateStore = RootStateModel.create();

// Listen to new snapshots, which are created anytime something changes
onSnapshot(RootStateStore, (snapshot) => {
  console.log("SNAPSHOT");
  console.log(snapshot);
});
