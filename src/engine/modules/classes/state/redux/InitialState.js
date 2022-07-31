export let InitialState = {
  app: {
    id: 1,
  },
  rig: {
    ready: false,
  },
  cam: {
    ready: false,
  },
  engine: {
    ready: false,
  },
  renderer: {
    ready: false,
    type: "THREE",
  },
  ecs: {
    type: "AFRAME",
  },
  house: {
    rooms: {
      livingRoom: { occupied: false, locked: false },
      kitchen: { occupied: false, locked: false },
      bathroom: { occupied: false, locked: false },
    },
    securityEnabled: false,
  },
};
