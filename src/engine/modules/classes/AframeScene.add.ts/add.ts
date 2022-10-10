// export const add = async (arg: any) => {
//     return new Promise((resolve, reject) => {
//       console.log("INSIDE SCENE ADD PROMISE ...");
//       console.log("this.entity");
//       console.log(this.entity);
//       console.log("this.entity.hasLoaded");
//       console.log(this.entity.hasLoaded);
//       console.log("arg");
//       console.log(arg);
//       console.log("typeof arg");
//       console.log(typeof arg);
//       switch (typeof arg) {
//         case "string":
//           const entity = document.createElement(arg);
//           if (this.entity.hasLoaded) {
//             this.entity.appendChild(entity);
//             resolve(entity);
//             return;
//           } else {
//             this.entity.addEventListener("loaded", () => {
//               this.entity.hasLoaded = true;
//               console.log("SCENE LOADED STRING ARG");
//               this.entity.appendChild(entity);
//               resolve(entity);
//               return;
//             });
//           }
//           break;
//         default:
//           const errorBox = document.createElement("a-box");
//           errorBox.setAttribute("color", "red");
//           errorBox.setAttribute("position", "0 0 -4");
//           if (this.entity.hasLoaded) {
//             this.entity.appendChild(errorBox);
//             reject(errorBox);
//             return;
//           } else {
//              this.entity.addEventListener("loaded", () => {
//               this.entity.hasLoaded = true;
//               this.entity.appendChild(entity);
//               reject(errorBox);
//               return;
//             });
//           }
//       }
//     });
//   }