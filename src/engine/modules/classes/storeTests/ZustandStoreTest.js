import create from "zustand";

window.bearsStore = create(set => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 })
}));

export class StoreTest {
  constructor() {
    console.log("Just made a Zustand store test.");
  }
}

//   function BearCounter() {
//   const bears = bearsStore(state => state.bears)
//   return <h1>{bears} around here ...</h1>
// }

// function Controls() {
//   const increasePopulation = bearsStore(state => state.increasePopulation)
//   return <button onClick={increasePopulation}>one up</button>
// }
