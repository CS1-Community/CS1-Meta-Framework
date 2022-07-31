//import { StateTest } from "./modules/classes/StateTest";
import { NavmeshTest } from "./modules/classes/NavmeshTest";
const CS1 = window.CS1; // We will eventually publish typedefs to be imported.
let decimal: number = 6.0;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;

// App source code.
(async () => {
  console.log(
    `The TypeScript number called decimal has a value of : ${decimal}!`
  );
  const main = () => {
    //const myStateTest = new StateTest();
    const myNavmeshTest = new NavmeshTest();
    //myStateTest.run();
    myNavmeshTest.run();
  };
  /*
  await CS1.engine.config({
    renderer: "Babylon"
  });
  await CS1.registry.entities.add({
    dog : "https://cdn.animals/dog.glb"
  });
  await CS1.registry.sounds.add({
    moo : "https://cdn.animals/moo.mp3"
  });
  await CS1.registry.particles.add({
    snow : "https://cdn.parts/snow.json"
  });
  await CS1.registry.pack.add({
    entities: {},
    sounds: {},
    particles: {}
  });
  await CS1.registry.pack.add("https://cdn.packs/monsters.json");
  await CS1.registry.pack.add("https://my.api/monsters/2");
  await sphere = CS1.add('sphere');
  sphere.position.set(2,0,-6);
  await box = CS1.add('box');
  const offset = "0 4 0";
  box.position.at(sphere, offset);
  */
  console.log("Calling CS1.run!");
  CS1.run(main);
})();
