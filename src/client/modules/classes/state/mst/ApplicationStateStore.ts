export let CS1;

import {
  types,
  onSnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  getParent,
} from "mobx-state-tree";

const LocalStateModel = types
  .model("LocalStateModel", {
    ready: false,
  })
  .actions((scene) => ({
    setReady(cs1, resolve): void {
      BackendStateStore.setReady(cs1, resolve);
    },
  }));

interface ILocalStateModel extends Instance<typeof LocalStateModel> {}
interface ILocalStateModelSnapshotIn
  extends SnapshotIn<typeof LocalStateModel> {}
interface ILocalStateModelSnapshotOut
  extends SnapshotOut<typeof LocalStateModel> {}

export const LocalStateStore = LocalStateModel.create();

const BackendStateModel = types
  .model("BackendStateModel", {
    ready: false,
  })
  .actions((scene) => ({
    setReady(cs1, resolve): void {
      // Await dynamic build out model based on API calls first.
      PeersStateStore.setReady(cs1, resolve);
    },
  }));

interface IBackendStateModel extends Instance<typeof BackendStateModel> {}
interface IBackendStateModelSnapshotIn
  extends SnapshotIn<typeof BackendStateModel> {}
interface IBackendStateModelSnapshotOut
  extends SnapshotOut<typeof BackendStateModel> {}

export const BackendStateStore = BackendStateModel.create();

const PeersStateModel = types
.model("PeersStateModel", {
  ready: false,
})
.actions((scene) => ({
  setReady(cs1, resolve): void {
    // Await signaling and webrtc related peer stuff first and
    // build out model dynamically first.
    ApplicationStateStore.setReady(cs1, resolve);
  },
}));

interface IPeersStateModel extends Instance<typeof PeersStateModel> {}
interface IPeersStateModelSnapshotIn
extends SnapshotIn<typeof PeersStateModel> {}
interface IPeersStateModelSnapshotOut
extends SnapshotOut<typeof PeersStateModel> {}

export const PeersStateStore = PeersStateModel.create();

export const ApplicationStateModel = types
  .model("ApplicationStateModel", {
    backend: BackendStateModel,
    peers: PeersStateModel,
    local: LocalStateModel,
    ready: false
  })
  .actions((application) => ({
    prepare(cs1, resolve): void {
      //DO API STUFF FIRST
      BackendStateStore.setReady(cs1, resolve);
    },
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
