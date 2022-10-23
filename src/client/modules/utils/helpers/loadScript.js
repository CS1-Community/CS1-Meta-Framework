
import { resolveWhenTrue } from "./resolveWhenTrue";

export function loadScript (url, test) {
    return new Promise(function (resolve, reject) {
      var head = document.getElementsByTagName("head")[0];
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.addEventListener("load", function () {
        this.removeEventListener("load", this);
        if (test) {
          resolveWhenTrue(resolve, reject, test);
        } else {
          console.log("Resolving loadScript in utils!");
          resolve();
        }
      });
      script.src = url;
      head.appendChild(script);
    });
  }