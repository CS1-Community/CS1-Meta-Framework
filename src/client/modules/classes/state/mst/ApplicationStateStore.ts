export let CS1;

import {
  types,
  onSnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  getParent,
} from "mobx-state-tree";

const NetworkStateModel = types
  .model("NetworkStateModel", {
    ready: false,
  })
  .actions((scene) => ({
    setReady(cs1, resolve): void {
      scene.ready = true;
      console.log("SCENE READY!");
      ApplicationStateStore.setReady(cs1, resolve);
    },
  }));

interface INetworkStateModel extends Instance<typeof NetworkStateModel> {}
interface INetworkStateModelSnapshotIn
  extends SnapshotIn<typeof NetworkStateModel> {}
interface INetworkStateModelSnapshotOut
  extends SnapshotOut<typeof NetworkStateModel> {}

export const ApplicationStateModel = types
  .model("ApplicationStateModel", {
    network: NetworkStateModel,
    ready: false
  })
  .actions((application) => ({
    setReady(cs1, resolve): void {
      application.ready = true;
      console.log("Application data store is READY!");
      resolve(cs1);
    },
    setEngine(cs1): void {
      CS1 = cs1;
    }
  }));

interface IApplictionStateModel extends Instance<typeof ApplicationStateModel> {}
interface IApplicationStateModelSnapshotIn
  extends SnapshotIn<typeof ApplicationStateModel> {}
interface IApplicationStateModelSnapshotOut
  extends SnapshotOut<typeof ApplicationStateModel> {}

export const ApplicationStateStore = ApplicationStateModel.create();

// Listen to new snapshots, which are created anytime something changes
onSnapshot(ApplicationStateStore, (snapshot) => {
  console.log("SNAPSHOT");
  console.log(snapshot);
});
